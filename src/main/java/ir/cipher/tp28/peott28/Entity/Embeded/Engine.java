package ir.cipher.tp28.peott28.Entity.Embeded;

import ir.cipher.tp28.peott28.Entity.Player;
import jakarta.persistence.*;

@Embeddable
public class Engine {
    @Column(name = "mining_power", nullable = false)
    private Double miningPower;

    @Column(name = "gas_usage", nullable = false)
    private Double gasUsage;

    @Column(name = "skin_cylinder_body")
    private Integer skin_cylinderBody;

    @Column(name = "skin_cylinder_fins")
    private Integer skin_cylinderFins;

    @Column(name = "skin_piston_body")
    private Integer skin_pistonBody;

    @Column(name = "skin_hub_body")
    private Integer skin_hubBody;

    @Column(name = "pistons_count", nullable = false)
    private Integer pistonsCount;

    public Integer getPistonsCount() {
        return pistonsCount;
    }

    public void setPistonsCount(Integer pistonsCount) {
        this.pistonsCount = pistonsCount;
    }

    public Integer getSkin_hubBody() {
        return skin_hubBody;
    }

    public void setSkin_hubBody(Integer skin_hubBody) {
        this.skin_hubBody = skin_hubBody;
    }

    public Integer getSkin_pistonBody() {
        return skin_pistonBody;
    }

    public void setSkin_pistonBody(Integer skin_pistonBody) {
        this.skin_pistonBody = skin_pistonBody;
    }

    public Integer getSkin_cylinderFins() {
        return skin_cylinderFins;
    }

    public void setSkin_cylinderFins(Integer skin_cylinderFins) {
        this.skin_cylinderFins = skin_cylinderFins;
    }

    public Integer getSkin_cylinderBody() {
        return skin_cylinderBody;
    }

    public void setSkin_cylinderBody(Integer skin_cylinderBody) {
        this.skin_cylinderBody = skin_cylinderBody;
    }

    public Double getGasUsage() {
        return gasUsage;
    }

    public void setGasUsage(Double gasUsage) {
        this.gasUsage = gasUsage;
    }

    public Double getMiningPower() {
        return miningPower;
    }

    public void setMiningPower(Double miningPower) {
        this.miningPower = miningPower;
    }
}