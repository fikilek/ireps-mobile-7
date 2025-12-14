import { View } from "react-native";
import { ListEmptyComponent } from "../../components/ListEmptyComponent";
import AstDetail from "./AstDetail";

const AstsDetails = (props) => {
  // console.log(`AstsDetails props`, props);
  const { asts } = props;
  // console.log(`AstsDetails asts`, asts);
  if (!asts || asts?.length === 0) {
    return <ListEmptyComponent msg="No Asts Found" />;
  }
  return (
    <View>
      {asts?.map((ast, index) => (
        <AstDetail key={ast.astId} ast={ast} />
      ))}
    </View>
  );
};

export default AstsDetails;
