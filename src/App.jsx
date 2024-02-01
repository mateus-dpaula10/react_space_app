import { styled } from "styled-components"
import EstilosGlobais from "./components/EstilosGlobais"
import Cabecalho from "./components/Cabecalho"
import BarraLateral from "./components/BarraLateral"
import Banner from "./components/Banner"
import bannerBackground from "../assets/banner.png"
import Galeria from "./components/Galeria"

import fotos from './fotos.json'
import { useEffect, useState } from "react"
import ModalZoom from "./components/ModalZoom"
import Rodape from "./components/Rodape"

const FundoGradiente = styled.div`
  min-height: 100vh;
  width: 100%;
  background: var(--Gradiente-fundo, linear-gradient(175deg, #041833 4.16%, #04244F 48%, #154580 96.76%));
`

const AppContainer = styled.div`
  width: 1440px;
  max-width: 100%;
  margin: 0 auto;
`

const MainContainer = styled.div`
  display: flex;
  gap: 24px;
`

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)
  const [filtro, setFiltro] = useState('')
  const [tag, setTag] = useState(0)
  const [fotoComZoom, setFotoComZoom] = useState(null)  

  useEffect(() => {
    const fotosFiltradas = fotos.filter(foto => {
      const filtroPorTag = !tag || foto.tagId === tag
      const filtroPorTitulo = !filtro || foto.titulo.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      return filtroPorTag && filtroPorTitulo
    })
    setFotosDaGaleria(fotosFiltradas)
  }, [filtro, tag])

  const aoAlternarFavorito = (foto) => {
    if(foto.id === fotoSelecionada?.id){
      setFotoComZoom({
        ...fotoComZoom,
        favorita: !fotoComZoom.favorita
      })
    }
    setFotosDaGaleria(fotosDaGaleria.map(fotosDaGaleria => {
      return {
        ...fotosDaGaleria,
        favorita: fotosDaGaleria.id === foto.id ? !foto.favorita : fotosDaGaleria.favorita
      }
    }))
  }

  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho 
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <MainContainer>
          <BarraLateral />
          <ConteudoGaleria>
            <Banner
              backgroundImage={bannerBackground}
              texto="A galeria mais completa de fotos do espaço!"
            />
            <Galeria 
              fotos={fotosDaGaleria}
              aoFotoSelecionada={foto => setFotoComZoom(foto)}
              aoAlternarFavorito={aoAlternarFavorito} 
              setTag={setTag} 
            />
          </ConteudoGaleria>
        </MainContainer>        
      </AppContainer>
      <ModalZoom 
        foto={fotoSelecionada} 
        aoFechar={() => setFotoSelecionada(null)}
        aoAlternarFavorito={aoAlternarFavorito}
      />
      <Rodape />
    </FundoGradiente>
  )
}

export default App
