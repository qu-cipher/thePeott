package ir.cipher.tp28.peott28.API.Utils.Res;

import ir.cipher.tp28.peott28.Entity.Embeded.Balance;
import ir.cipher.tp28.peott28.Entity.Embeded.Engine;
import ir.cipher.tp28.peott28.Entity.Player;

import java.util.Set;

public class PlayerData implements Response{
    public long telegramId;
    public String username;
    public Balance balance;
    public String avatar;
    public String inviteCode;
    public String refCode;
    public Engine engine;
    public Set<Player> friends;
    public String region;

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public long getTelegramId() {
        return telegramId;
    }

    public void setTelegramId(long telegramId) {
        this.telegramId = telegramId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Balance getBalance() {
        return balance;
    }

    public void setBalance(Balance balance) {
        this.balance = balance;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public String getRefCode() {
        return refCode;
    }

    public void setRefCode(String refCode) {
        this.refCode = refCode;
    }

    public Engine getEngine() {
        return engine;
    }

    public void setEngine(Engine engine) {
        this.engine = engine;
    }

    public Set<Player> getFriends() {
        return friends;
    }

    public void setFriends(Set<Player> friends) {
        this.friends = friends;
    }
}
