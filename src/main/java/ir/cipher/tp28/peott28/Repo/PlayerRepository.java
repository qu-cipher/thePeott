package ir.cipher.tp28.peott28.Repo;

import ir.cipher.tp28.peott28.Entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    boolean existsByPlayerTelegramId(Long playerTelegramId);

    Optional<Player> getByPlayerTelegramId(Long playerTelegramId);

    Optional<Player> getByInviteCode(String inviteCode);
}