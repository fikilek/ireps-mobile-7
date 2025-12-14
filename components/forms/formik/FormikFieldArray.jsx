import { MaterialIcons } from "@expo/vector-icons";
import { FieldArray } from "formik";
import { Alert, TextInput, View } from "react-native";
import { useSps } from "../../../hooks/useSps";
import { CustomDropdown } from "../../customDropdown/CustomDropdown";

const FormikFieldArray = (props) => {
  // console.log(`props @ FormikFieldArray`, props);
  const { label, name, placeHolder, icon, ...rest } = props;

  const {
    sps,

    activeSps,
    setActiveSps,
    activeSpsName,
    setActiveSpsName,

    isLoading,
    isError,
    isFetching,
  } = useSps();
  // console.log(`activeSps.length`, activeSps.length);

  return (
    <FieldArray name={name} {...rest}>
      {(props) => {
        // console.log(`FormikFieldArray props`, props);
        // console.log(`FormikFieldArray props`, props);

        const { push, remove, field, form, meta } = props;
        // console.log(`FormikFieldArray form`, form);

        const { handleBlur, values, handleChange } = form;
        // console.log(`FormikFieldArray values`, values);

        const { subContractors, tradingName } = values;
        // console.log(`FormikFieldArray subContractors`, subContractors);

        // eg subcontractors = [{id: 'lefu12', name: 'Lefu'}]. Options properties must be changed to 'label' and 'value'.
        const spsWithCurrnetRemoved = activeSps?.filter(
          (sp) => sp?.tradingName !== tradingName
        );

        const options = spsWithCurrnetRemoved?.map((sp) => {
          return {
            label: sp?.tradingName,
            value: sp?.tradingName,
            id: sp?.id,
          };
        });
        // console.log(`FormikFieldArray options`, options);

        const handleValueChange = (value) => {
          console.log(`New Value:`, value);
          // Check if sub is already a sub
          if (subContractors.find((sub) => sub.id === value?.id)) {
            Alert.alert(`${value?.label} already a sub`);
            return;
          } else {
            // Update sp with the new subContractor.
            // console.log(`Proceed and add Sub`, value?.label);
            push({ id: value?.id, name: value?.label });
          }
        };

        return (
          <View>
            <CustomDropdown
              options={options}
              onValueChange={handleValueChange}
              placeholder="Choose"
              initialValue={{
                label: "Choose",
                value: "Choose",
              }}
              data={"data"}
            />
            {subContractors.map((subContractor, index) => {
              // console.log(`subContractor`, subContractor);
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    backgroundColor: "lightgrey",
                    marginTop: 5,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                  }}
                >
                  <TextInput
                    onChangeText={handleChange(`subContractor[${index}].name`)}
                    onBlur={handleBlur(`subContractor[${index}].name`)}
                    value={subContractor.name}
                  />
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color="indigo"
                    onPress={() => remove(index)}
                  />
                </View>
              );
            })}
          </View>
        );
      }}
    </FieldArray>
  );
};

export default FormikFieldArray;
