package ir.cipher.tp28.peott28.Entity.Embeded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Balance {
    @Column(name = "coins", nullable = false)
    private Double coins;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "airdrop_reward")
    private Double airdropReward;

    public Double getAirdropReward() {
        return airdropReward;
    }

    public void setAirdropReward(Double airdropReward) {
        this.airdropReward = airdropReward;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Double getCoins() {
        return coins;
    }

    public void setCoins(Double coins) {
        this.coins = coins;
    }
}