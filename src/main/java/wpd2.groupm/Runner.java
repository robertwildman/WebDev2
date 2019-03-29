
package wpd2.groupm;

import wpd2.groupm.DB.H2Project;
import wpd2.groupm.servlet.DemoServlet;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wpd2.groupm.servlet.MilestoneServlet;
import wpd2.groupm.servlet.ProjectServlet;

public class Runner {
    @SuppressWarnings("unused")
    private static final Logger LOG = LoggerFactory.getLogger(Runner.class);

    private static final int PORT = 9000;
    private final H2Project h2Project;
    private final String shopName;

    private Runner(String shopName) {
        this.shopName = shopName;
        h2Project = new H2Project();
    }

    //the start method, starts the server and sets up the servlets that the server knows
    private void start() throws Exception {

        //creating an instance of the server listening on the specified port
        Server server = new Server(PORT);

        //creating a servlet context handler defining the environment for the servlets to run, e.g. which folder
        //the root is mapped to
        ServletContextHandler handler = new ServletContextHandler(server, "/", ServletContextHandler.SESSIONS);
        handler.setContextPath("/");
        handler.setInitParameter("org.eclipse.jetty.servlet.Default." + "resourceBase", "src/main/resources/webapp");

        //instantiating DemoServlet, see class DemoServlet, and defining the requests that this responds to
        //and adding it to the server
        DemoServlet demoServlet = new DemoServlet(shopName);
        handler.addServlet(new ServletHolder(demoServlet), "/shop/*");

        //Adding Project
       ProjectServlet projectServlet = new ProjectServlet(h2Project);
        handler.addServlet(new ServletHolder(projectServlet), "/");

        //Adding Milestone
        MilestoneServlet milestoneServlet = new MilestoneServlet(h2Project);
        handler.addServlet(new ServletHolder(milestoneServlet), "/milestone");

        //start the server
        server.start();
        LOG.info("Server started, will run until terminated");
        server.join();

    }

    public static void main(String[] args) {
        try {
            LOG.info("starting");
            new Runner("Demo Shop").start();
        } catch (Exception e) {
            LOG.error("Unexpected error running shop: " + e.getMessage());
        }
    }
}
