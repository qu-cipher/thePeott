package ir.cipher.tp28.peott28.API.Player;

import ir.cipher.tp28.peott28.API.Utils.Actions;
import ir.cipher.tp28.peott28.API.Utils.Body.PlayerDataUpdateBody;
import ir.cipher.tp28.peott28.API.Utils.Body.PlayerRegistrationBody;
import ir.cipher.tp28.peott28.API.Utils.Messages;
import ir.cipher.tp28.peott28.API.Utils.Res.Common;
import ir.cipher.tp28.peott28.API.Utils.Res.PlayerData;
import ir.cipher.tp28.peott28.API.Utils.Res.Response;
import ir.cipher.tp28.peott28.Exceptions.PlayerAlreadyExistsException;
import ir.cipher.tp28.peott28.Exceptions.PlayerNotFoundException;
import ir.cipher.tp28.peott28.Exceptions.RegionNotFoundException;
import org.apache.kafka.shaded.io.opentelemetry.proto.trace.v1.ResourceSpans;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/player")
@Component("playerController")
public class Controller {
    private final Service service;

    public Controller(Service service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<Response> registerPlayer(@RequestBody PlayerRegistrationBody b){
        try {
            service.registerPlayer(b);
            return ResponseEntity.ok(
                    new Common(Actions.REGISTER_PLAYER.getString(),
                            Messages.SUCCESS.getString())
            );
        } catch (PlayerAlreadyExistsException e) {
            return ResponseEntity.status(400).body(
                    new Common(Actions.REGISTER_PLAYER.getString(),
                            Messages.PLAYER_ALREADY_EXISTS.getString())
            );
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Response> updatePlayerData(@RequestBody PlayerDataUpdateBody b) {
        try {
            service.playerDataUpdate(b);
            return ResponseEntity.ok(new Common(
                    Actions.UPDATE_PLAYER_DATA.getString(),
                    Messages.SUCCESS.getString()
            ));
        } catch (PlayerNotFoundException e) {
            return ResponseEntity.status(400).body(
                    new Common(Actions.REGISTER_PLAYER.getString(),
                            Messages.PLAYER_NOT_FOUND.getString())
            );
        } catch (RegionNotFoundException e) {
            return ResponseEntity.status(400).body(
                    new Common(Actions.REGISTER_PLAYER.getString(),
                            Messages.REGION_NOT_FOUND.getString())
            );
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Response> getPlayerData(@RequestParam(name = "id") long telegramId) {
        try {
            PlayerData pd = service.getPlayerData(telegramId);

            return ResponseEntity.ok(pd);
        } catch (PlayerNotFoundException e) {
            return ResponseEntity.status(400).body(
                    new Common(Actions.GET_PLAYER_DATA.getString(),
                        Messages.PLAYER_NOT_FOUND.getString()));
        }
    }
}
