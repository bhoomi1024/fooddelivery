import React from 'react'
import Navbar from '../../../components/AfterLoginUsersComp/usersNavbar'

const UsersDishes = () => {
  // Sample menu data
  const menuItems = [
    { id: 1, name: 'Pizza', image: 'https://res.cloudinary.com/ddyejtuqb/image/upload/v1719814366/resss_mqx2vx.jpg' },
    { id: 2, name: 'Pasta', image: 'https://res.cloudinary.com/ddyejtuqb/image/upload/v1719814366/resss_mqx2vx.jpg' },
    { id: 3, name: 'Salad', image: 'https://res.cloudinary.com/ddyejtuqb/image/upload/v1719814366/resss_mqx2vx.jpg' },
    { id: 4, name: 'Burger', image: 'https://res.cloudinary.com/ddyejtuqb/image/upload/v1719814366/resss_mqx2vx.jpg' },
    { id: 5, name: 'Sushi', image: 'https://res.cloudinary.com/ddyejtuqb/image/upload/v1719814366/resss_mqx2vx.jpg' },
  ]

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
              
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* <p className="text-gray-600">${item.price.toFixed(2)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UsersDishes