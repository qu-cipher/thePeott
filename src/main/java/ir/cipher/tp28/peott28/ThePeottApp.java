package ir.cipher.tp28.peott28;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Scanner;

@SpringBootApplication
public class ThePeottApp {

	public static void main(String[] args) {
		SpringApplication.run(ThePeottApp.class, args);
	}

	@Bean
	public CommandLineRunner cmd() {
		return args -> {
			System.out.println("\nWaiting for command...");
			try (Scanner sc = new Scanner(System.in)) {
				while (true) {
					System.out.print("::");
					String input = sc.nextLine();
					if (input.trim().equalsIgnoreCase("stop")) {
						System.out.println("Exiting...");
						System.exit(0);
					} else if (input.startsWith("say ")) {
						String message = input.substring(4).trim();
						System.out.println(message);
					} else {
						System.out.println("Unknown command. Try 'help' to see available commands.");
					}
				}
			}
		};
	}
}
