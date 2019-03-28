package com.GCU.servlet;

import com.GCU.Classes.Project;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ProjectServlet extends BaseServlet {


    //good practice to declare the template that is populated as a constant, why?
    //declare your template here
    private static final String MESSAGE_BOARD_TEMPLATE = "mb.mustache";
    //auto generated, so that servlet can be serialized
    private static final long serialVersionUID = 687117339002032958L;

    public ProjectServlet() {
    }

    //right now, setting the data for the page by hand, later that comes from a data store
    private Object getObject() {
        Project p = new Project();
        p.setName("First Project");
        p.setDescription("This is my first Ever Project");

        return p;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        showView(response, MESSAGE_BOARD_TEMPLATE, getObject());
    }
}
