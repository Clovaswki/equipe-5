import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import api from "../services/api"

const rows = [

];

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function InconsistentOrders({ inconsistentArts }) {
    const [allArts, setAllArts] = useState()
    const classes = useStyles();

  

    useEffect(() => {
        let idCount = 0
        inconsistentArts.forEach(art => {
            rows.push({ id: idCount + 1, numero: art.numero, finalidade: art.finalidade, entidade: art.entidade, qtdAtividades: art.qtdAtividades, preco: '00' })
        });
    }, [])

    return (
        <React.Fragment>
            <Title>Anotações de Responsabilidade Técnica inválidadas</Title>
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
        </React.Fragment>
    );
}