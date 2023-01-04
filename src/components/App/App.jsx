import {useState, useEffect} from 'react';
import axios from 'axios';

const creatureData = [
  // {id: 1, name: 'Unicorn', origin: 'Britain'},
  // {id: 2, name: 'Sphinx', origin: 'Egypt'},
  // {id: 3, name: 'Jackalope', origin: 'America'},
  // {id: 4, name: 'Godzilla', origin: 'Nuclear Radiation'}
];

function App () {
 
  const [creatureList, setCreatureList] = useState(creatureData);
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
      .then((response) =>{
        console.log('GET response', response.data);
        setCreatureList(response.data);
      })
      .catch((error) => {
        console.log('error: creatures failed', error)
      });
  }

  const addCreature = (event) => {
    event.preventDefault();
    console.log('add Creature clicked')
    // post request
  }
  
  return (
    <div>
      <h2>Add Creature</h2>
      <h4>{newCreatureName}</h4>
      <h4>{newCreatureOrigin}</h4>
      <form onSubmit={addCreature}>
        <label htmlFor="name">Name: </label>
        <input id="name" onChange={(event) => setNewCreatureName(event.target.value)}/>
        <label htmlFor="origin">Origin: </label>
        <input id="origin" onChange={(event) => setNewCreatureOrigin(event.target.value)} />
        <button type="submit">Add New Creature</button>
      </form>

      <ul>
        {creatureList.map(creature => (
          <li key={creature.name}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
