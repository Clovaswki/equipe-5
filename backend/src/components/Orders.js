import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

//test
import api from "../services/api"

const rows = [

];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({setScreenFinishArt}) {
  const classes = useStyles();

  //get all ART's
  const getArts = async () => {
    try {
      const res = await api.get("/get-arts")
      let idCount=0
      res.data.arts.forEach(art => {
        rows.push({ id:idCount+1, numero: art.numero, finalidade: art.finalidade, entidade: art.entidade, qtdAtividades: art.qtdAtividades, preco:'00' })
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
      <Title>Anotações de Responsabilidade Técnica</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Numero</TableCell>
            <TableCell>Finalidade</TableCell>
            <TableCell>entidade</TableCell>
            <TableCell>Qtd atvs</TableCell>
            <TableCell align="right">Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.numero}</TableCell>
              <TableCell>{row.finalidade}</TableCell>
              <TableCell>{row.entidade}</TableCell>
              <TableCell>{row.qtdAtividades}</TableCell>
              <TableCell align="right">{row.preco}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={setScreenFinishArt(true)}>
          Analisar todas as ART's
        </Link>
      </div>
    </React.Fragment>
  );
}