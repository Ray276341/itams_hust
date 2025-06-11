import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { formatDate } from "../../helpers/format";
import {
  GitCommit,
  getRepoCommitsBySourceCodeId,
} from "../../api/githubUpdate";

const headCells = [
  { id: "date", label: "Date" },
  { id: "author", label: "Author" },
  { id: "message", label: "Message" },
  { id: "sha", label: "Commit SHA" },
] as const;

type HeadCell = (typeof headCells)[number]["id"];

export default function SourceCodeUpdateTable({
  sourceCodeId,
}: {
  sourceCodeId: number;
}) {
  const [rows, setRows] = React.useState<GitCommit[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    getRepoCommitsBySourceCodeId(sourceCodeId).then((data) => {
      setRows(data ?? []);
    });
  }, [sourceCodeId]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ mb: 2 }}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                {headCells.map((h) => (
                  <TableCell key={h.id} sx={{ fontWeight: 700 }}>
                    {h.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((r) => (
                  <TableRow key={r.sha}>
                    <TableCell>{formatDate(r.date)}</TableCell>
                    <TableCell>{r.author}</TableCell>
                    <TableCell>{r.message}</TableCell>
                    <TableCell>
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        {r.sha.slice(0, 7)}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No updates available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
}
