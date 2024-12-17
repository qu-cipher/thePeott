package ir.cipher.tp28.peott28;

import ir.cipher.tp28.peott28.API.Player.Service;
import ir.cipher.tp28.peott28.Entity.Obj.PlayerStatus;
import ir.cipher.tp28.peott28.Exceptions.PlayerNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;
import java.util.Scanner;

@Component
public class Commands {
    private static final Logger logger = LoggerFactory.getLogger(ThePeottApp.class);;
    private final ConfigurableApplicationContext context;
    private final Service playerService;
    private volatile boolean running = true;

    public Commands(ConfigurableApplicationContext context, Service playerService) {
        this.context = context;
        this.playerService = playerService;
    }

    @Bean()
    public CommandLineRunner cmd() {
        return args -> {
            Thread cmdThread = new Thread(this::runCommandInterface);
            cmdThread.setDaemon(true);
            cmdThread.start();
            System.out.println("Command interface started. Type 'help' for available commands.");
        };
    }

    private void runCommandInterface() {
        try (Scanner sc = new Scanner(System.in)) {
            while (running) {
                try {
                    System.out.print("::");
                    String input = sc.nextLine().trim();

                    if (input.isEmpty()) continue;

                    switch (input.toLowerCase()) {
                        case "stop":
                            handleStopCommand();
                            break;
                        case "help":
                            displayHelp();
                            break;
                        default:
                            if (input.startsWith("say")) {
                                handleSayCommand(input);
                            } else if (input.startsWith("activate_player")) {
                                handleActivatePlayerCommand(input);
                            } else if (input.startsWith("sus_player")) {
                                handleSuspendPlayerCommand(input);
                            } else if (input.startsWith("ban_player")) {
                                handleBanPlayerCommand(input);
                            } else {
                                System.out.println("Unknown command. Type 'help' to see available commands.");
                            }
                    }
                } catch (NoSuchElementException e) {
                    logger.error("Input stream closed unexpectedly", e);
                    break;
                } catch (Exception e) {
                    logger.error("Error processing command", e);
                }
            }
        }
    }

    private void handleStopCommand() {
        System.out.println("Initiating shutdown...");
        running = false;
        SpringApplication.exit(context, () -> 0);
    }

    private void handleSayCommand(String input) {
        String message = input.replaceAll("\\s", "").substring(3).trim();
        if (!message.isEmpty()) {
            System.out.println(message);
        } else {
            logger.error("Arguments needed (1) but (0) given");
        }
    }

    private void handleActivatePlayerCommand(String inp) {
        // activate_player
        long id = Long.parseLong(inp
                .replaceAll("\\s", "")
                .substring(15));
        try {
            playerService.updatePlayerStatus(id, PlayerStatus.ACTIVE);
            logger.info("Account Activated!");
        } catch (PlayerNotFoundException e) {
            logger.error("Player <" + id + "> Not Found.");
        }
    }

    private void handleSuspendPlayerCommand(String inp) {
        // sus_player
        long id = Long.parseLong(inp
                .replaceAll("\\s", "")
                .substring(10));
        try {
            playerService.updatePlayerStatus(id, PlayerStatus.SUSPENDED);
            logger.info("Player Suspended!");
        } catch (PlayerNotFoundException e) {
            logger.error("Player <" + id + "> Not Found.");
        }
    }

    private void handleBanPlayerCommand(String inp) {
        // ban_player
        long id = Long.parseLong(inp
                .replaceAll("\\s", "")
                .substring(10));
        try {
            playerService.updatePlayerStatus(id, PlayerStatus.BANNED);
            logger.info("Player Banned!");
        } catch (PlayerNotFoundException e) {
            logger.error("Player <" + id + "> Not Found.");
        }
    }

    private void displayHelp() {
        System.out.println("Available commands:");

        System.out.println("\tBasic Commands:");
        System.out.println("\t\tsay <message>  - Echo a message");
        System.out.println("\t\thelp           - Show this help menu");
        System.out.println("\t\tstop           - Stop the application");

        System.out.println("\tPlayer Commands:");
        System.out.println("\t\tactivate_player <player_id>  - Activate a player's account");
        System.out.println("\t\tsus_player <player_id>       - Suspend a player's account");
        System.out.println("\t\tban_player <player_id>       - Ban a player's account");
    }
}
