import { Box } from "@mui/material";
import RelationshipTable from "./RelationshipTable";
import PageHeader from "../../components/PageHeader";

function AllRelationships() {
  return (
    <Box>
      <PageHeader
        name="All Service Types"
        destination="/relationships/create"
      />
      <RelationshipTable />
    </Box>
  );
}

export default AllRelationships;
