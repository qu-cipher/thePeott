package ir.cipher.tp28.peott28.API.Utils;

public enum Messages {
    SUCCESS("SUCCESS"),
    PLAYER_ALREADY_EXISTS("PLAYER_ALREADY_EXISTS"),
    PLAYER_NOT_FOUND("PLAYER_NOT_FOUND"),
    REGION_NOT_FOUND("REGION_NOT_FOUND");

    private final String string;
    Messages(String v) {
        this.string = v;
    }

    public String getString() {
        return string;
    }
}
