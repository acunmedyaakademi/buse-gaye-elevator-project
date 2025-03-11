import { useState } from 'react'

const totalFloors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Elevator() {
  const [floors, setFloors] = useState(totalFloors);
  const [currentFloor, setCurrentFloor] = useState(0);
  const [elevatorFloor, setElevatorFloor] = useState(0);

  function moveElevator(floor) {
    floor = parseInt(prompt("Lütfen gitmek istediğiniz kat numarasını giriniz:"));
    setElevatorFloor(floor);
  }

  return (
    <>
      <div className="elevator-container">
        <div className="floors">
          {floors.map((item, i) =>
            <p key={i} className='floor-item'>
              {item}
            </p>
          )}
        </div>
        <div className="elevator" style={{ transform: `translateY(${elevatorFloor * 55}px)` }}>

        </div>
        <button onClick={moveElevator} className='move-btn'>Hareket ettir</button>
      </div>
    </>
  )
};