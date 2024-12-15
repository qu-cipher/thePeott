package ir.cipher.tp28.peott28.API.Utils;

public enum Actions {
    REGISTER_PLAYER("REGISTER_PLAYER"),
    UPDATE_PLAYER_DATA("UPDATE_PLAYER_DATA"),
    GET_PLAYER_DATA("GET_PLAYER_DATA");

    private final String string;
    Actions(String v) {
        this.string = v;
    }

    public String getString() {
        return string;
    }
}
