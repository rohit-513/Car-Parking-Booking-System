package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Booking
 */
@WebServlet("/Booking")
public class Booking extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Booking() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String FirstName = request.getParameter("FName");		
		String LastName = request.getParameter("LName");
		String Email = request.getParameter("Email");
		String Phone_Number = request.getParameter("number");
		String SlotId = request.getParameter("SlotId");
		String FromBookingDate = request.getParameter("fromBookingDate");
		String ToBookingDate = request.getParameter("toBookingDate");
		String FromTime = request.getParameter("fromTime");
		String ToTime = request.getParameter("toTime");
		
	    PrintWriter out = response.getWriter();
						
	 Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/anup","root","Root123#");
		
				PreparedStatement pstmt = con.prepareStatement("insert into Booking values(?,?,?,?,?,?,?,?,?,?)");
				
				pstmt.setString(1,FirstName);								
				pstmt.setString(2,LastName);
				pstmt.setString(3,Email);
				pstmt.setString(4,Phone_Number);
				pstmt.setString(5,SlotId);
				pstmt.setString(6,FromBookingDate);
				pstmt.setString(7,ToBookingDate);
				pstmt.setString(8,FromTime);
				pstmt.setString(9,ToTime);
				pstmt.setString(10, "Active");
				
				int rowsUpdated = pstmt.executeUpdate();
				
				if(rowsUpdated == 1) {
					out.print("book slot successfully");
				}else {
					out.print("Failed");
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
