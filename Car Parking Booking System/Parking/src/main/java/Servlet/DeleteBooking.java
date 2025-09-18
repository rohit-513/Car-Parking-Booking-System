package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class DeleteBooking
 */
@WebServlet("/DeleteBooking")
public class DeleteBooking extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteBooking() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String SlotId = request.getParameter("slotNumber");
		
		PrintWriter out = response.getWriter();
		
		 Connection con = null;
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				con = DriverManager.getConnection("jdbc:mysql://localhost:3306/anup","root","Root123#");
			
				String query = "update booking set status = 'Inactive' where Slot_Number='"+SlotId+"'";
	
				Statement st = con.createStatement();
				
			 int rowUpdated = st.executeUpdate(query);
				
				
			 if(rowUpdated > 0) {
				 out.print("slot is deleted");
			 }else {
				 out.print("slot is not deleted");
			 }
				
			
			}
			catch(Exception e) {
				System.out.println(e);
			}finally {
				if(con != null) {
					try {
						con.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
