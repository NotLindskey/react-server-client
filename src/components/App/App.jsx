import {useState, useEffect} from 'react';
import axios from 'axios';
import ListItem from '../ListItem/ListItem';

// const creatureData = [
//   // {id: 1, name: 'Unicorn', origin: 'Britain'},
//   // {id: 2, name: 'Sphinx', origin: 'Egypt'},
//   // {id: 3, name: 'Jackalope', origin: 'America'},
//   // {id: 4, name: 'Godzilla', origin: 'Nuclear Radiation'}
// ];

function App () {
 
  const [creatureList, setCreatureList] = useState([]);
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');
  
  useEffect(() => {
    fetchCreatures();
  }, []);

  const fetchCreatures = () => {
      // Axios({
      //   method: 'GET',
      //  url: '/creature'
      // })

      axios.get('/creature')
      .then((response) => {
        console.log('GET response', response.data);
        setCreatureList(response.data);
      })
      .catch((error) => {
        console.log('error: creatures failed', error)
      });
  }

  const addCreature = (event) => {
    event.preventDefault();
    console.log('add Creature clicked', newCreatureName, newCreatureOrigin);
    // post request
    axios({
      method: 'POST',
      url: "/creature",
      data: {
        name: newCreatureName,
        origin: newCreatureOrigin
      }
    })
    .then((response) => {
      console.log(response);
      setNewCreatureName('')
      setNewCreatureOrigin('');
      fetchCreatures();
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  return (
    <div>
      <h2>Add Creature</h2>
      <h4>{newCreatureName}</h4>
      <h4>{newCreatureOrigin}</h4>
      <form onSubmit={addCreature}>
        <label htmlFor="name">Name: </label>
        <input id="name" value={newCreatureName} onChange={(event) => setNewCreatureName(event.target.value)}/>
        <label htmlFor="origin">Origin: </label>
        <input id="origin" value={newCreatureOrigin} onChange={(e) => setNewCreatureOrigin(e.target.value)} />
        <button type="submit">Add New Creature</button>
      </form>

    {/* <p>{JSON.stringify(creatureList)}</p> */}
      <ul>
        {creatureList.map(creature => (
          <ListItem key={creature.id} creature={creature} />
        ))}
      </ul>
    </div>
  );
}

export default App
