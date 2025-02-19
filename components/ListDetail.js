import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { Checkbox, IconButton } from "react-native-paper";
import Selector from "./Selector";

const ListDetail = ({
  title,
  actions,
  filters,
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
      <Selector title={title} actions={actions} filters={filters} />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
          {title}
        </Text>
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 8,
            borderRadius: 5,
          }}
        />
        <FlatList
          data={showItems}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <Checkbox
                status={
                  selectedRowKeys.includes(item.key) ? "checked" : "unchecked"
                }
                onPress={() => toggleSelection(item.key)}
              />
              <Text style={{ flex: 1, marginLeft: 8 }}>{item.name}</Text>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text>
            Showing {showItems.length} of {filteredData.length} results
          </Text>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="chevron-left"
              disabled={currentPage === 1}
              onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            <Text>{currentPage}</Text>
            <IconButton
              icon="chevron-right"
              disabled={endIndex >= totalPage}
              onPress={() => setCurrentPage((prev) => prev + 1)}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ListDetail;
