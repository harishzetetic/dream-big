import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useState} from 'react'


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({posts}) {
  const sessionValue = JSON.parse(sessionStorage.getItem('user'))
  const rows = posts;
  if(rows)
  return (
    <React.Fragment>
      <Title>Recent Posts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Type</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Likes</TableCell>
            <TableCell>Dislikes</TableCell>
            <TableCell>Publish on</TableCell>
            <TableCell align="right">Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.postType}</TableCell>
              <TableCell>{row.postTitle}</TableCell>
              <TableCell>{row.likes.length}</TableCell>
              <TableCell>{row.dislikes.length}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell align="right">{`${row.comments.length}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}