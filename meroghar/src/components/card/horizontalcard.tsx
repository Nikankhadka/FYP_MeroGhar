

export default function HorizontalCard(){
    return(
    <div className="bg-white rounded-md shadow-md overflow-hidden">
  <div className="md:flex md:items-center">
    <div className="md:flex-shrink-0">
      <img src="/prop1.jpg" alt="Property Image" className="w-full h-64 object-cover md:w-64"/>
    </div>
    <div className="p-4 md:w-1/2">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <p className="mb-2"><strong>Property:</strong> Property Name</p>
      <p className="mb-2"><strong>Date:</strong> June 1-3, 2023</p>
      <p className="mb-2"><strong>Number of Guests:</strong> 2</p>
    </div>
    <div className="p-4 md:w-1/2 md:flex md:items-center">
      <div className="md:flex-shrink-0 md:mr-4">
        <img src="/user.png" alt="Tenant Image" className="w-16 h-16 object-cover rounded-full md:w-24 md:h-24"/>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Tenant Details</h2>
        <p className="mb-2"><strong>Name:</strong> John Doe</p>
        <p className="mb-2"><strong>Email:</strong> johndoe@example.com</p>
        <p className="mb-2"><strong>Phone:</strong> 555-555-5555</p>
      </div>
    </div>
  </div>
</div>

    )
}