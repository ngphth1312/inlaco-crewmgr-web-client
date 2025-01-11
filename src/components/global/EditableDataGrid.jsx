import React from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { mockCrewMemberInfos } from "../../data/mockData";
import { COLOR } from "../../assets/Color";
import { NoValuesOverlay } from "../global";

function replacePositionName(arr) {
  return arr.map((item) => {
    if (item.position && item.position.name) {
      item.positionName = item.position.name;
      delete item.position;
    }
    return item;
  });
}

const initialRows = replacePositionName(mockCrewMemberInfos);

function randomID() {
  return Math.random().toString(36).substring(2, 12);
}

export default function EditableDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleAddCrewClick = () => {
    const id = randomID();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        crewID: "",
        fullName: "",
        dob: "",
        phoneNumber: "",
        position: {
          name: "",
        },
        isNew: true,
      },
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "crewID" },
    }));
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "crewID",
      headerName: "Mã TV",
      flex: 2,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Họ tên",
      flex: 3,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      type: "date",
      flex: 2,
      editable: true,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => new Date(params?.value),
    },
    {
      field: "phoneNumber",
      headerName: "SĐT",
      flex: 2,
      align: "left",
      headerAlign: "left",
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "positionName",
      headerName: "Vị trí chuyên môn",
      flex: 3,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Thao tác",
      flex: 2,
      align: "center",
      headerAlign: "center",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: COLOR.primary_black_placeholder,
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              sx={{ color: COLOR.primary_orange }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteForeverRoundedIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            sx={{ color: COLOR.primary_orange }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        "& .actions": {
          color: COLOR.primary_black_placeholder,
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: COLOR.secondary_blue,
          color: COLOR.primary_white,
        },
        "& .MuiTablePagination-root": {
          backgroundColor: COLOR.secondary_blue,
          color: COLOR.primary_white,
        },
      }}
    >
      <Button
        variant="contained"
        sx={{
          width: "18%",
          padding: 1,
          color: COLOR.primary_black,
          backgroundColor: COLOR.primary_gold,
          minWidth: 130,
          marginBottom: 2,
        }}
        onClick={handleAddCrewClick}
      >
        <Box sx={{ display: "flex", alignItems: "end" }}>
          <PersonAddIcon sx={{ marginRight: "5px", marginBottom: "1px" }} />
          <Typography sx={{ fontWeight: 700 }}>Thêm thuyền viên</Typography>
        </Box>
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        disableColumnMenu
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10, { value: -1, label: "All" }]}
        slots={{ noRowsOverlay: NoValuesOverlay }}
        slotProps={{
          noRowsOverlay: { text: "CHƯA CÓ THUYỀN VIÊN NÀO ĐƯỢC THÊM" },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        sx={{
          backgroundColor: "#FFF",
          headerAlign: "center",
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: 16,
            fontWeight: 700,
          },
        }}
      />
    </Box>
  );
}
