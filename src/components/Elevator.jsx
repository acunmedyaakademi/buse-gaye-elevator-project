import { useState, useEffect } from "react";

export default function Elevator() {
  const [floors, setFloors] = useState(() =>
    Array.from({ length: 11 }, () => [])
  );
  const [peoples, setPeoples] = useState([]);
  const [currentFloor, setCurrentFloor] = useState(0);
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [transitionTime, setTransitionTime] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [opening, setOpening] = useState(false); // Kapı durumu (true: kapalı, false: açık)
  const [passenger, setPassenger] = useState(null); // Asansördeki kişi
  const [openDialog, setOpenDialog] = useState(false);

  function moveElevator() {
    if (peoples.length === 0) {
      alert("Asansörde kimse yok!");
      return;
    }

    const person = peoples[0]; // İlk kişiyi al
    setIsMoving(true);
    setOpening(false); // Önce kapıyı kapat
    const toPickupTime = Math.abs(0 - currentFloor) * 0.5;
    setTransitionTime(toPickupTime);
    setElevatorFloor(0);

    setTimeout(() => {
      setCurrentFloor(0);
      setTimeout(() => {
        setOpening(true); // Kapıyı aç
        setTimeout(() => {
          setPassenger({ ...person }); // Kapı açıldıktan sonra kişi binebilir
          setPeoples((prev) => prev.slice(1)); // Kişiyi listeden çıkar

          // Kapıyı tekrar kapat
          setTimeout(() => {
            setOpening(false);
            const toTargetTime = Math.abs(person.targetFloor - 0) * 0.5;
            setTransitionTime(toTargetTime);
            setElevatorFloor(person.targetFloor);

            // Hedef kata ulaştığında
            setTimeout(() => {
              setCurrentFloor(person.targetFloor);
              setTimeout(() => {
                setOpening(true); // Kapıyı aç
                setTimeout(() => {
                  setFloors((prev) => {
                    const newFloors = [...prev];
                    newFloors[person.targetFloor] = [
                      ...newFloors[person.targetFloor],
                      person.img,
                    ]; // Kişiyi hedef kata ekle
                    return newFloors;
                  });
                  setPassenger(null); // Kişiyi asansörden çıkar

                  setTimeout(() => setOpening(false), 500); // Kapıyı kapat
                  setIsMoving(false);
                }, 500); // Kişi kapı açılmadan inmemeli
              }, 500);
            }, toTargetTime * 1000);
          }, 500);
        }, 500);
      }, 100); // Kapıyı açmadan önce bekleme süresi
    }, toPickupTime * 1000);
  }

  function addPeople() {
    const targetFloor = Math.floor(Math.random() * 10) + 1;
    setPeoples((prev) => [
      ...prev,
      { id: prev.length + 1, img: "💁🏻‍♀️", targetFloor },
    ]);
  }

  function handleFloorBtn(floor) {
    setElevatorFloor(floor);
    setOpening(false);
    setIsMoving(true);
    const toTargetTime = Math.abs(floor - currentFloor) * 0.5;
    setTransitionTime(toTargetTime);

    setTimeout(() => {
      setCurrentFloor(floor);
      setTimeout(() => {
        setOpening(true);
        setIsMoving(false);
        const person = floors[floor][0];
        setPassenger({ img: person, id: Math.random() }); // Asansöre binen kişi
        console.log(person);
        setFloors((prev) => {
          const newFloors = [...prev];
          newFloors[floor] = newFloors[floor].slice(1); // O kattaki ilk kişiyi listeden çıkar
          return newFloors;
        });
        console.log("Kişi asansöre bindi:", person);
        setOpenDialog(true);
      }, 500);

      console.log("aaa");
    }, toTargetTime * 1000);
  }

  function handleSelect() {
    const selectedFloor = Number(document.getElementById("targetFloor").value);
            setOpenDialog(false);
            setOpening(false);
            setIsMoving(true); 

            const toTargetTime = Math.abs(selectedFloor - currentFloor) * 0.5;
            setTransitionTime(toTargetTime);
            setElevatorFloor(selectedFloor);

            setTimeout(() => {
              setCurrentFloor(selectedFloor);
              setTimeout(() => {
                setOpening(true);
                setTimeout(() => {
                  setFloors((prev) => {
                    const newFloors = [...prev];
                    newFloors[selectedFloor] = [...newFloors[selectedFloor], passenger.img];
                    return newFloors;
                  });
                  setPassenger(null);
                  setTimeout(() => setOpening(false), 500);
                }, 500);
              }, 500);
            }, toTargetTime * 1000);
          
  }

  return (
    <>
      <div className="elevator-container">
        <div className="floors">
          {floors.map((item, i) => (
            <div key={i} className="floor">
              <p className="floor-item">
                {i}{" "}
                {floors[i].map((emoji, index) => (
                  <span key={index}>{emoji}</span>
                ))}
                {floors[i].length !== 0 && (
                  <button onClick={() => handleFloorBtn(i)}>🔴</button>
                )}
              </p>
            </div>
          ))}
        </div>
        <div
          className={`elevator ${opening ? "opening" : ""}`}
          style={{
            transform: `translateY(-${elevatorFloor * 55}px)`,
            transition: `transform ${transitionTime}s ease-in-out`,
          }}
        >
          <div className="door-left"></div>
          <div className="door-right"></div>
          <div className={`passenger ${opening ? "" : "hidden"}`}>
            {passenger ? passenger.img : ""}
          </div>
        </div>
        <button onClick={moveElevator} className="move-btn" disabled={isMoving}>
          {isMoving ? "Asansör Hareket Ediyor..." : "Hareket Ettir"}
        </button>
      </div>
      <div className="add-person-container">
        <button onClick={addPeople}>Kişi Ekle</button>
        <ul className="person-list">
          {peoples.map((person, index) => (
            <li className="person" key={index}>
              {person.img} (kat: {person.targetFloor})
            </li>
          ))}
        </ul>
      </div>

      {openDialog && <div className="overlay"></div>}
      {openDialog && (
        <dialog open className="dialog">
          <h3>Hedef Kat Seç</h3>
          <select id="targetFloor">
            {[...Array(11).keys()].map((floor) => (
              <option key={floor} value={floor}>{floor}</option>
            ))}
          </select>
          <button onClick={() => handleSelect()}>Git</button>
        </dialog>
      )}
      
    </>
  );
}
