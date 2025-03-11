import { useState, useEffect } from 'react';

const totalFloors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Elevator() {
  const [floors, setFloors] = useState(totalFloors);
  const [peoples, setPeoples] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(0); // Asansörün bulunduğu kat
  const [elevatorFloor, setElevatorFloor] = useState(0); // Gidilmek istenen kat
  const [transitionTime, setTransitionTime] = useState(0); // Hareket süresi

  function moveElevator() {
    let floor = parseInt(prompt("Lütfen gitmek istediğiniz kat numarasını giriniz:"), 10);
    if (isNaN(floor) || floor < 0 || floor > 10) {
      alert("Geçerli bir kat numarası giriniz!");
      return;
    }

    setTransitionTime(Math.abs(floor - currentFloor) * 0.5);
    setElevatorFloor(floor);
  }

  function addPeople() {
    setPeoples([...peoples, "💁🏻‍♀️"]);
  }

  // Asansör hedef kata ulaştığında currentFloor'u güncelle
  useEffect(() => {
    if (elevatorFloor !== currentFloor) {
      const timer = setTimeout(() => {
        setCurrentFloor(elevatorFloor);
        console.log(transitionTime)
      }, transitionTime * 500); // Hareket süresi kadar bekleyip güncelle

      return () => clearTimeout(timer);
    }
  }, [elevatorFloor, transitionTime]);

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
        <button onClick={moveElevator} className='move-btn'>Hareket Ettir</button>
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
  );
}
