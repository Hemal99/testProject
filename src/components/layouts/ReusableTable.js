import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import Button from '@material-ui/core/Button'
import { Grid } from "@material-ui/core";





const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});




const originalRows = [
  { name: "Pizza", calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "bostan,ca,broolin", calories: 300, fat: 8, carbs: 24, protein: 4.0 },
  { name: "Hot Dog", calories: 300, fat: 8, carbs: 24, protein: 4.0 },
  { name: "Burger", calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Hamburger", calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Fries", calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Ice Cream", calories: 700, fat: 6.0, carbs: 24, protein: 4.0 }
];

export default function BasicTable() {



  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");
  const classes = useStyles();


  




  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      const str = JSON.stringify(row).toLowerCase();

      if (str.search(searchedVal) >= 0) return row;
    });
    setRows(filteredRows);
  };



  const filterData = (data) => {


    let name = data.name.trim().toLowerCase()
    let calories = data.calories.trim().toLowerCase()

    let filteredRows;

    if (name) {
      filteredRows = originalRows.filter((row) => {
        const str = JSON.stringify(row).toLowerCase();

        if (str.search(name) >= 0) return row;
      });
    }

    if (calories) {
      filteredRows = originalRows.filter((row) => {
        const str = JSON.stringify(row).toLowerCase();

        if (str.search(calories) >= 0) return row;
      });
    }

    if (name && calories) {
      console.log("heloooo")
      filteredRows = originalRows.filter((row) => {
        const str = JSON.stringify(row).toLowerCase();

        if (str.search(calories) >= 0 && str.search(name) >= 0) return row;
      });
    }



    setRows(filteredRows);



    //  setRows(newData)
  }

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <Paper>
        <Grid>
          <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={() => filterData({ name: 'bostan,ca', calories: '300' })}>filter</Button>
        </Grid>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table"
         
          >
            <TableHead>
              <TableRow>
                <TableCell>Food (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />

    </>
  );
}
