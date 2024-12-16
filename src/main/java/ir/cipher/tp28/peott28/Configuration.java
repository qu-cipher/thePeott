package ir.cipher.tp28.peott28;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

@org.springframework.context.annotation.Configuration
public class Configuration {
    /*
    * HikariDatasource Config
    */
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres");
        dataSource.setUsername("postgres.jdfownxtvjjahgsuqyaq");
        dataSource.setPassword("$Tbd4J6Km!UdwuB");
        dataSource.setAutoCommit(false);
        return dataSource;
    }
}
