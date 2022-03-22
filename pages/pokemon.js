import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Link from 'next/link';
import styles from '../styles/Pokedex.module.scss'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export async function getStaticProps() {
    const apiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126`);
    const jsonPokemon = await apiPokemon.json();
    const total = jsonPokemon.count;  

    const Capitalized = str => {
        if (typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    const listPokemon = [];
    for (let index = 0; index < total; index++) {
        listPokemon[index] = {
            numero: index.toString(),
            slug: '/pokemon/'+jsonPokemon.results[index].name,
            nome: Capitalized(jsonPokemon.results[index].name),
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+(index+1)+'.png'
        }
    }

    return {
        props: {
            total: total, 
            listPokemon: listPokemon
        }
    }
}

export default function ResponsiveGrid(props) {    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, md: 3, lg: 9 }}>
        {Array.from(Array(props.total)).map((_, index) => (
            <Grid item xs={1} key={index}>
                <Link href={props.listPokemon[index].slug} >
                    <a className={styles.pokemon}>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img alt="complex" src={props.listPokemon[index].image} />
                        </ButtonBase>
                        <Typography gutterBottom variant="subtitle1" component="span">
                            {props.listPokemon[index].nome}
                        </Typography>
                    </a>
                </Link>
            </Grid>
        ))}
      </Grid>
    </Box>
    
  );
}







