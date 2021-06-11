import React, { Component } from 'react'
import styled from 'styled-components'

import apiMovies from './api/Api'

const BoxMap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const Main = styled.div`
  padding: 7%;
`

const ImgsMovie = styled.img`
  width: 250px;
  height: 350px;
  margin: 1rem;
`

const ContainerMain = styled.div`
  height: 100vh;
  background-color: #F4F4F4;
`

const InputSearch = styled.input`
  width: 100%;
  height: 56px;
  background: #FFFFFF 0% 0% no-repeat;
  border-radius: 6px;
  font-size: 24px;
  padding: 10px;
`

const Title = styled.h1`
  font-size: 40px;
  padding: 1rem 0;
`

const BoxTitleSearch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 25vh;
  background-color: #000;
  color: #fff;
  padding: 9%;
`
const Container = styled.div`
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
`

class App extends Component {

  state = {
    listMovies: [],
    searchValue: '',
    filteredList: []
  }

  async componentDidMount() {
    const response = await apiMovies.get()

    const moviesImgs = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`
      };
    });

    this.setState({
      listMovies: moviesImgs,
      filteredList: moviesImgs
    });
  }

  handleChange = (event) => {
    
    const { listMovies } = this.state;

   const filteredItems = listMovies.filter(item => {
      if (event.target.value === '') {
        return item
      } else if (
        item.title.toLowerCase().includes(event.target.value.toLowerCase())) {
        return item
      }
    })
    this.setState({
      filteredList: filteredItems
    })
  }

  render() {

    const { filteredList } = this.state;

    return (
      <Container>
        <BoxTitleSearch>
          <Title>Find movies</Title>
          <InputSearch type="text" placeholder="E.g. Harry Potter" onChange={this.handleChange} />
        </BoxTitleSearch>
        <ContainerMain>
          <Main>
            <BoxMap>
              {filteredList.slice(0,8).map((item, index) => (
                  <div key={index}>
                    <ImgsMovie src={item.poster_path} alt="poster movies" />
                  </div>
                ))}
            </BoxMap>
          </Main>
        </ContainerMain>
      </Container>
    )
  }
}

export default App;