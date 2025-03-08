import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Checkbox, IconButton, DataTable } from "react-native-paper";
import Selector from "./Selector";
const ListDetail = ({
  actions,
  data,
  column,
  onSelectionChange,
  setHasSelected,
}) => {
  const mappedData = data.map((item) => ({ ...item, key: item.id }));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = mappedData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const itemsPerPage = 10;
  const totalPage = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const showItems = filteredData.slice(startIndex, endIndex);

  const toggleSelection = (key) => {
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((item) => item !== key)
      : [...selectedRowKeys, key];

    setSelectedRowKeys(newSelectedRowKeys);
    if (onSelectionChange) {
      onSelectionChange(newSelectedRowKeys);
    }
    if (setHasSelected) {
      setHasSelected(newSelectedRowKeys.length > 0);
    }
  };

  return (
    <>
      <Selector actions={actions} />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />
        <View style={styles.navContainer}>
          <Text>
            Hiển thị {showItems.length} trên {filteredData.length} kết quả
          </Text>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              style={{ marginTop: -6 }}
              icon="chevron-left"
              disabled={currentPage === 1}
              onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            <Text>{currentPage}</Text>
            <IconButton
              style={{ marginTop: -6 }}
              icon="chevron-right"
              disabled={endIndex >= totalPage}
              onPress={() => setCurrentPage((prev) => prev + 1)}
            />
          </View>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Checkbox</DataTable.Title>
            {column.map((col) => (
              <DataTable.Title key={col.key}>{col.title}</DataTable.Title>
            ))}
          </DataTable.Header>
          {showItems.map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell>
                <Checkbox
                  status={
                    selectedRowKeys.includes(item.key) ? "checked" : "unchecked"
                  }
                  onPress={() => toggleSelection(item.key)}
                />
              </DataTable.Cell>
              {column.map((col) => (
                <DataTable.Cell key={col.key}>
                  {col.render
                    ? col.render(item[col.dataIndex], item)
                    : item[col.dataIndex]}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ListDetail;
