package ir.cipher.tp28.peott28;

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
    private volatile boolean running = true;

    public Commands(ConfigurableApplicationContext context) {
        this.context = context;
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
        String message = input.substring(4).trim();
        if (!message.isEmpty()) {
            System.out.println(message);
        } else {
            System.out.println("Arguments needed (1) but (0) given");
        }
    }

    private void displayHelp() {
        System.out.println("Available commands:");
        System.out.println("  say <message>  - Echo a message");
        System.out.println("  help           - Show this help menu");
        System.out.println("  stop           - Stop the application");
    }
}
