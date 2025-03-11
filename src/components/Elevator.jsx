import { useState } from 'react'

const totalFloors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Elevator() {
  const [floors, setFloors] = useState(totalFloors);
  const [peoples, setPeoples] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(0); // şu anda bulunulan kat
  const [elevatorFloor, setElevatorFloor] = useState(0); // gidilmek istenen kat

  function moveElevator(floor) {
    floor = parseInt(prompt("Lütfen gitmek istediğiniz kat numarasını giriniz:"));
    setElevatorFloor(floor);
  }

  function addPeople() {
    setPeoples([...peoples, "💁🏻‍♀️"]);
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 11);
  }

  const transitionTime = elevatorFloor > currentFloor
    ? (elevatorFloor - currentFloor) * 1
    : (currentFloor - elevatorFloor) * 1;

  console.log(transitionTime)

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
        <div className="elevator" style={{
          transform: `translateY(-${elevatorFloor * 55}px)`,
          transition: `transform ${transitionTime}s ease-in-out`
        }}>

        </div>
        <button onClick={moveElevator} className='move-btn'>Hareket ettir</button>
      </div>
      <div className="add-person-container">
        <button onClick={addPeople}>Kişi Ekle</button>
        <ul className='person-list'>
          {peoples.map((person, index) => (
            <li className='person' key={index}>{person}</li>
          ))}
        </ul>
      </div>
    </>
  )
};