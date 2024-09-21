import {useState} from 'react'
import { Header } from '../../components/Header';
import ItemList from '../../components/ItemList'
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  
  const handleGetData = async () => {

    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    console.log(newUser)

    if (newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name , bio, login});
      
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json()

      if (newRepos.length){
        setRepos(newRepos);
      }
    }
  }
  return (

    <div>
      <Header />
          
        <div className="principal">
          
        {/* AREA DE INPUT */}

        <div className="inputs">
          <label> Digite o perfil do GitHub</label>
  <input
    className="escreve"
    name="usuario"
    value={user}
    onChange={event => setUser(event.target.value)}
    placeholder="@user"
  />
  <button className="" onClick={handleGetData}>mandar</button>

        {/* AREA DO PERFIL */}

  {currentUser?.name ? (
    <div>
      <div className="secao-profile">
        <img
          src={currentUser.avatar_url}
          alt="foto do perfil github"
          className="profile"
        />
        <h3>{currentUser.name}</h3>
        <b>@{currentUser.login}</b>
        <p>{currentUser.bio}</p>
      </div>
      <div className="divisao">
        <hr />
      </div>
    </div>
  ) : null}
</div>

        </div>

        {repos?.length ? (
          <div className="repositorios">
        <h4>Repositórios</h4>
            {repos.map(repo => (
        <ItemList title={repo.name} description={repo.description} link={repo.html_url} />
      ) )}
        </div>
      ) : null}
    </div>

  
  );
}

export default App;
