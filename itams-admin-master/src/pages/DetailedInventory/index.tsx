import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getAssetToInventoryByInventoryId,
  getLicenseToInventoryByInventoryId,
  getServiceToInventoryByInventoryId,
  getInventoryById,
  updateInventory,
} from "../../api/inventory";
import { getAllStatuses } from "../../api/status";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import {
  AssetToInventory,
  LicenseToInventory,
  ServiceToInventory,
  Status,
  Inventory as InventoryInterface,
  NewInventory,
} from "../../interface/interface";
import DetailedInventoryAssetTable from "./Asset/DetailedInventoryAssetTable";
import DetailedInventoryLicenseTable from "./License/DetailedInventoryLicenseTable";
import DetailedInventoryServiceTable from "./Service/DetailedInventoryServiceTable";
import { toast } from "react-toastify";
import { formatDate } from "../../helpers/format";

export default function DetailedInventory() {
  const { inventoryId } = useParams<{ inventoryId: string }>();
  const [inventoryDetail, setInventoryDetail] =
    React.useState<InventoryInterface | null>(null);
  const [statuses, setStatuses] = React.useState<Status[]>([]);
  const [assetRows, setAssetRows] = React.useState<AssetToInventory[]>([]);
  const [licenseRows, setLicenseRows] = React.useState<LicenseToInventory[]>(
    []
  );
  const [serviceRows, setServiceRows] = React.useState<ServiceToInventory[]>(
    []
  );

  const [loadingInventory, setLoadingInventory] = React.useState(false);
  const [loadingAssets, setLoadingAssets] = React.useState(false);
  const [loadingLicenses, setLoadingLicenses] = React.useState(false);
  const [loadingServices, setLoadingServices] = React.useState(false);

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const fetchInventoryDetail = async () => {
    setLoadingInventory(true);
    try {
      const inv = await getInventoryById(+inventoryId!);
      setInventoryDetail(inv);
      const statList = await getAllStatuses();
      setStatuses(statList);
    } catch (err) {
      console.error("Error fetching inventory detail:", err);
      toast.error("Failed to load inventory details.");
    }
    setLoadingInventory(false);
  };

  React.useEffect(() => {
    fetchInventoryDetail();
  }, [inventoryId]);

  const fetchAssets = async () => {
    setLoadingAssets(true);
    try {
      const assets = await getAssetToInventoryByInventoryId(+inventoryId!);
      setAssetRows(assets);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load assets.");
    }
    setLoadingAssets(false);
  };

  const fetchLicenses = async () => {
    setLoadingLicenses(true);
    try {
      const licenses = await getLicenseToInventoryByInventoryId(+inventoryId!);
      setLicenseRows(licenses);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load licenses.");
    }
    setLoadingLicenses(false);
  };

  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const services = await getServiceToInventoryByInventoryId(+inventoryId!);
      setServiceRows(services);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load services.");
    }
    setLoadingServices(false);
  };

  React.useEffect(() => {
    fetchAssets();
    fetchLicenses();
    fetchServices();
  }, [inventoryId]);

  const openConfirmDialog = () => {
    setConfirmOpen(true);
  };
  const closeConfirmDialog = () => {
    setConfirmOpen(false);
  };

  const handleMarkAsDone = async () => {
    if (!inventoryDetail) {
      toast.error("Inventory not loaded. Try again.");
      return;
    }

    const payload: NewInventory = {
      name: inventoryDetail.name,
      start_date: inventoryDetail.start_date,
      end_date: inventoryDetail.end_date,
      departmentId: (inventoryDetail as any).department.id ?? 0,
      note: inventoryDetail.note,
      done: true,
    };

    try {
      await updateInventory(inventoryDetail.id, payload);
      toast.success("Inventory marked as Done.");
      fetchInventoryDetail();
    } catch (err) {
      console.error("Error marking inventory as done:", err);
      toast.error("Failed to mark as Done.");
    }
    setConfirmOpen(false);
  };

  return (
    <Box>
      <PageHeader name="View Detailed Inventory" canGoBack />
      {loadingInventory || !inventoryDetail ? (
        <Box sx={{ mt: 4 }}>
          <Loading />
        </Box>
      ) : (
        <>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 4,
              borderRadius: 1,
            }}
          >
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              alignItems="center"
              mb={1}
            >
              <Box>
                <Typography>
                  <strong>Name:</strong> {inventoryDetail.name}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  <strong>Department:</strong>{" "}
                  {(inventoryDetail as any).department.name}
                </Typography>
              </Box>
            </Box>

            <Box mb={1}>
              <Typography>
                <strong>Note:</strong>{" "}
                {inventoryDetail.note?.length > 0 ? inventoryDetail.note : "—"}
              </Typography>
            </Box>

            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              alignItems="center"
            >
              <Box>
                <Typography>
                  <strong>Start Date:</strong>{" "}
                  {formatDate(inventoryDetail.start_date)}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  <strong>End Date:</strong>{" "}
                  {inventoryDetail.end_date
                    ? formatDate(inventoryDetail.end_date)
                    : "—"}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* ASSETS TABLE */}
          <Box mb={4}>
            {loadingAssets ? (
              <Loading />
            ) : (
              <DetailedInventoryAssetTable
                id={inventoryId!}
                initData={assetRows}
                getData={fetchAssets}
                statuses={statuses}
                hideDoneColumn={String(inventoryDetail.done) === "true"}
              />
            )}
          </Box>

          {/* LICENSES TABLE */}
          <Box mb={4}>
            {loadingLicenses ? (
              <Loading />
            ) : (
              <DetailedInventoryLicenseTable
                id={inventoryId!}
                initData={licenseRows}
                getData={fetchLicenses}
                statuses={statuses}
                hideDoneColumn={String(inventoryDetail.done) === "true"}
              />
            )}
          </Box>

          {/* SERVICES TABLE */}
          <Box mb={4}>
            {loadingServices ? (
              <Loading />
            ) : (
              <DetailedInventoryServiceTable
                id={inventoryId!}
                initData={serviceRows}
                getData={fetchServices}
                statuses={statuses}
                hideDoneColumn={String(inventoryDetail.done) === "true"}
              />
            )}
          </Box>

          <Box sx={{ textAlign: "center", mt: 2, mb: 4 }}>
            {String(inventoryDetail.done) !== "true" && (
              <Button
                variant="contained"
                color="primary"
                onClick={openConfirmDialog}
              >
                Mark Inventory as Done
              </Button>
            )}
            {String(inventoryDetail.done) === "true" && (
              <Typography color="textSecondary">
                This inventory is already marked as Done.
              </Typography>
            )}
          </Box>
        </>
      )}

      <Dialog
        open={confirmOpen}
        onClose={closeConfirmDialog}
        aria-labelledby="confirm-done-dialog-title"
        aria-describedby="confirm-done-dialog-description"
      >
        <DialogTitle id="confirm-done-dialog-title">
          Mark Inventory as Done?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-done-dialog-description">
            You can not make change to this inventory it was marked as “Done.”
            Are you sure you want to mark this as “Done”?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMarkAsDone} color="error" autoFocus>
            Yes, mark as Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
