package ir.cipher.tp28.peott28.API.Utils.Body;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PlayerDataUpdateBody {
    @NotNull
    @NotBlank
    private long playerTelegramId;

    @NotNull
    @NotBlank
    private String toUsername;

    @NotNull
    @NotBlank
    private String toAvatar;

    @NotNull
    @NotBlank
    private String toRegion;

    public long getPlayerTelegramId() {
        return playerTelegramId;
    }

    public void setPlayerTelegramId(long playerTelegramId) {
        this.playerTelegramId = playerTelegramId;
    }

    public String getToUsername() {
        return toUsername;
    }

    public void setToUsername(String toUsername) {
        this.toUsername = toUsername;
    }

    public String getToAvatar() {
        return toAvatar;
    }

    public void setToAvatar(String toAvatar) {
        this.toAvatar = toAvatar;
    }

    public String getToRegion() {
        return toRegion;
    }

    public void setToRegion(String toRegion) {
        this.toRegion = toRegion;
    }
}
