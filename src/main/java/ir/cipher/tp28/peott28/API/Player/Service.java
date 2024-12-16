package ir.cipher.tp28.peott28.API.Player;

import ir.cipher.tp28.peott28.API.Utils.Body.PlayerDataUpdateBody;
import ir.cipher.tp28.peott28.API.Utils.Body.PlayerRegistrationBody;
import ir.cipher.tp28.peott28.API.Utils.Res.PlayerData;
import ir.cipher.tp28.peott28.Entity.Embeded.Balance;
import ir.cipher.tp28.peott28.Entity.Embeded.Engine;
import ir.cipher.tp28.peott28.Entity.Player;
import ir.cipher.tp28.peott28.Exceptions.PlayerAlreadyExistsException;
import ir.cipher.tp28.peott28.Exceptions.PlayerNotFoundException;
import ir.cipher.tp28.peott28.Exceptions.RegionNotFoundException;
import ir.cipher.tp28.peott28.Entity.Obj.Region;
import ir.cipher.tp28.peott28.Repo.PlayerRepository;
import jakarta.transaction.Transactional;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@org.springframework.stereotype.Service
public class Service {
    private final PlayerRepository repo;

    public Service(PlayerRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public void registerPlayer(PlayerRegistrationBody b)
            throws PlayerAlreadyExistsException {
        if (anyPlayer(b.getTelegramId())) {
            throw new PlayerAlreadyExistsException();
        }

        Player player = new Player();
        player.setPlayerTelegramId(b.getTelegramId());
        player.setUsername(b.getUsername());
        player.setAvatarURL(b.getAvatarUrl());
        player.setRefCode(b.getRefCode());
        if (!anyRegion(b.getRegion().toUpperCase())) {
            player.setRegion(Region.valueOf(b.getRegion().toUpperCase()));
        } else {
            player.setRegion(Region.INTERNATIONAL);
        }
        Engine engine = new Engine();
        engine.setGasUsage(0.25);
        engine.setMiningPower(1.00);
        engine.setPistonsCount(1);
        player.setEngine(engine);

        Balance balance = new Balance();
        balance.setCoins(0.00);
        balance.setTotal(0.00);
        balance.setAirdropReward(0.00);
        player.setBalance(balance);

        player.setInviteCode("pt-"+b.getTelegramId());
        if (b.getRefCode() != null && !b.getRefCode().isEmpty()){
            Optional<Player> inviter = repo.getByInviteCode(b.getRefCode());
            inviter.ifPresent(p -> {
                Set<Player> friends = null;
                if(p.getFriends() != null) {
                    friends = p.getFriends();
                } else {
                    friends = new LinkedHashSet<>();
                }
                friends.add(player);
                p.setFriends(friends);
            });
        }

        player.setFriends(new LinkedHashSet<>());
        repo.save(player);
    }

    public void playerDataUpdate(PlayerDataUpdateBody body)
            throws PlayerNotFoundException, RegionNotFoundException {
        Optional<Player> player = repo.getByPlayerTelegramId(body.getPlayerTelegramId());
        if (player.isPresent()){
            player.get().setUsername(body.getToUsername());
            player.get().setAvatarURL(body.getToAvatar());
            if (anyRegion(body.getToRegion())) player.get().setRegion(Region.valueOf(body.getToRegion()));
            else throw new RegionNotFoundException();
        } else {
            throw new PlayerNotFoundException();
        }
    }

    public PlayerData getPlayerData(long id)
            throws PlayerNotFoundException {
        Optional<Player> opPl = repo.getByPlayerTelegramId(id);
        if (opPl.isPresent()) {
            Player p = opPl.get();
            PlayerData pd = new PlayerData();
            pd.setTelegramId(id);
            pd.setUsername(p.getUsername());
            pd.setInviteCode(p.getInviteCode());
            pd.setRefCode(p.getRefCode());
            pd.setAvatar(p.getAvatarURL());
            pd.setBalance(p.getBalance());
            pd.setEngine(p.getEngine());
            pd.setFriends(p.getFriends());
            pd.setRegion(p.getRegion().toString());
            return pd;
        } else {
            throw new PlayerNotFoundException();
        }
    }

    private boolean anyRegion(String region){
        try {
            Region.valueOf(region);
            return true;
        } catch (IllegalArgumentException ex) {
            return false;
        }
    }

    private boolean anyPlayer(long id) {
        return repo.existsByPlayerTelegramId(id);
    }
}
