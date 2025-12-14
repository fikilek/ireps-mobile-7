import StockItemComponent from "./StockItemComponent";

const StoreStock = (props) => {
  const { stock, stockList } = props;
  // console.log(`stock`, stock);

  if (stock?.length) {
    return stock?.map((stockItem, index) => {
      return (
        <StockItemComponent
          key={index}
          label={stockItem?.label}
          value={stockItem?.value}
          stockList={stockList}
        />
      );
    });
  } else {
    return (
      <StockItemComponent label={"No Stock"} value={0} stockList={stockList} />
    );
  }
};

export default StoreStock;
