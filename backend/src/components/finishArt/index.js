import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Chart from '../Chart';
import Deposits from '../Deposits';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

//components
import InconsistentOrders from "../Inconsistent"

import "./styles.css"

//test
import api from "../../services/api"

// Generate Order Data
function createData(id, numero, finalidade, entidade, qtdAtividades, preco) {
  return { id, numero, finalidade, entidade, qtdAtividades, preco };
}

const rows = [

];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const consistentes = {
  title: "ART's válidas",
  numero: 0
}
const inconsistentes = {
  title: "ART's inválidas",
  numero: 0
}

export default function FinishArt() {
  const [allArts, setAllArts] = useState()
  const classes = useStyles();
  const [artsInconsistentes, setArtsInconsistentes] = useState()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  async function analisarArts(event) {
    event.preventDefault();
    var inconsistentArts=[]
    try {
      const res = await api.get("/analisar")
      console.log(res.data)
      res.data.arts.forEach(art => {
        if (art.consistente) {

        } else {
          inconsistentArts.push(art)
        }
      })
      setAllArts(inconsistentArts)
    } catch (error) {
      console.log(error)
    }
  }

  //get all ART's
  const getArts = async () => {
    try {
      const res = await api.get("/get-arts")
      setAllArts(res.data)
      let idCount = 0
      res.data.arts.forEach(art => {
        rows.push({ id: idCount + 1, numero: art.numero, finalidade: art.finalidade, entidade: art.entidade, qtdAtividades: art.qtdAtividades, preco: '00' })
      });

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getArts()
  }, [])

  return (
    <React.Fragment>

      <Grid container spacing={3}>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits info={consistentes} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits info={inconsistentes} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <div className='finishArt'>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <InconsistentOrders inconsistentArts={artsInconsistentes}/>
            </Paper>
          </Grid>
        </div>
      </Grid>

    </React.Fragment>
  );
}