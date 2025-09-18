package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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
import com.fasterxml.jackson.core.JsonProcessingException;


import bean.BookingBean;

/**
 * Servlet implementation class BookingList
 */
@WebServlet("/BookingList")
public class BookingList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BookingList() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String email = request.getParameter("email");
		
		PrintWriter out = response.getWriter();
		
		 Connection con = null;
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				con = DriverManager.getConnection("jdbc:mysql://localhost:3306/anup","root","Root123#");
			
				String query = "select * from booking where email='"+email+"'";
	
				Statement st = con.createStatement();
				
				ResultSet rs = st.executeQuery(query);
				
				List<BookingBean> bookingList = new ArrayList<BookingBean>();
				
				while(rs.next()) {
					BookingBean bookingObj = new BookingBean();
					bookingObj.setFirstName(rs.getString("First_Name"));
					bookingObj.setLastName(rs.getString("Last_Name"));
					bookingObj.setEmail(rs.getString("Email"));
					bookingObj.setPhoneNumber(rs.getString("Phone_Number"));
					bookingObj.setSlotNumber(rs.getString("Slot_Number"));
					bookingObj.setFrombookingDate(rs.getString("From_booking_date"));
					bookingObj.setToBookingdate(rs.getString("To_booking_date"));
					bookingObj.setFromTime(rs.getString("From_time"));
					bookingObj.setToTime(rs.getString("To_time"));
					bookingObj.setStatus(rs.getString("status"));
					
					bookingList.add(bookingObj);					
				}
				
				if(bookingList.size() > 0) {
					ObjectMapper Obj = new ObjectMapper();
					 String jsonStr = Obj.writeValueAsString(bookingList) ;
					out.print(jsonStr);
				}else {
					out.print("NO_RECORD_FOUND");
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
