import { Flex, Form, Spin } from "antd";
import {
  CategoryList,
  CategoryListProps,
  CharacterCard,
  PriceInput,
  SearchInput,
} from "../molecules";
import { SelectInput, TextButton } from "../atoms";
import { DefaultOptionType } from "antd/es/select";
import { CloseCircleFilled } from "@ant-design/icons";
import { Category, CharacterTheme, PriceSort, TimeSort } from "@/data/models";
import { Reducer, useContext, useReducer, useState } from "react";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import useFetchCharacters from "@/hooks/useFetchCharacters";
import useQueryCharacters from "@/hooks/useSearchCharacters";
import {
  CharacterReducerState,
  CharactersActionType,
  CharactersContext,
  CharactersDispatchContext,
  charactersReducer,
  initialCharacterReducerState,
} from "@/context/characters";

const tierOptions: DefaultOptionType[] = [
  {
    label: "all",
    value: "All",
  },
  {
    label: "Common",
    value: Category.COMMON,
  },
  {
    label: "Rare",
    value: Category.RARE,
  },
  {
    label: "Epic",
    value: Category.EPIC,
  },
];
const themeOptions: DefaultOptionType[] = [
  {
    label: "Halloween",
    value: CharacterTheme.HALLOWEEN,
  },
  {
    label: "Christmas",
    value: CharacterTheme.CHRISTMAS,
  },
  {
    label: "Lunar New Year",
    value: CharacterTheme.LUNAR,
  },
];
const timeOptions: DefaultOptionType[] = [
  {
    label: "Latest",
    value: TimeSort.LATEST,
  },
  {
    label: "Oldest",
    value: TimeSort.OLDEST,
  },
];
const priceOptions: DefaultOptionType[] = [
  {
    label: "Low to high",
    value: PriceSort.LOW_TO_HIGH,
  },
  {
    label: "High to low",
    value: PriceSort.HIGH_TO_LOW,
  },
];

const formInputs: {
  name: string;
  component: JSX.Element;
  label?: string;
}[] = [
  {
    name: "search",
    component: <SearchInput />,
  },
  {
    label: "price range",
    name: "priceRange",
    component: <PriceInput />,
  },
  {
    label: "tier",
    name: "tier",
    component: <SelectInput options={tierOptions} />,
  },
  {
    label: "theme",
    name: "theme",
    component: <SelectInput options={themeOptions} />,
  },
  {
    label: "timeSort",
    name: "timeSort",
    component: <SelectInput options={timeOptions} />,
  },
  {
    label: "priceSort",
    name: "priceSort",
    component: <SelectInput options={priceOptions} />,
  },
];

const SearchAndFilter = () => {
  const [form] = useForm();
  const { executeQuery } = useQueryCharacters();

  const onFinish = (values: {
    search: string;
    priceRange: [number, number];
    tier: Category | "All";
    theme: CharacterTheme;
    timeSort: TimeSort;
    priceSort: PriceSort;
  }) => {
    executeQuery(values.search, {
      lowestPrice: values.priceRange[0],
      highestPrice: values.priceRange[1],
      tier: values.tier,
      theme: values.theme,
      timeSort: values.timeSort,
      priceSort: values.priceSort,
    });
  };

  return (
    <Form
      form={form}
      initialValues={{
        searchQuery: "",
        priceRange: [0, 200],
        theme: themeOptions[0].value,
        tier: tierOptions[0].value,
        timeSort: timeOptions[0].value,
        priceSort: priceOptions[0].value,
      }}
      layout="vertical"
      colon={false}
      onFinish={onFinish}
    >
      {formInputs.map(({ label, name, component }) => (
        <FormItem
          key={`form-input-${name}`}
          name={name}
          label={label ? <strong>{label?.toUpperCase()}</strong> : null}
        >
          {component}
        </FormItem>
      ))}
      <Flex style={{ marginTop: "2em" }} gap="large">
        <TextButton
          icon={<CloseCircleFilled />}
          variant="text"
          color="default"
          onClick={() => form.resetFields()}
        >
          Reset filter
        </TextButton>
        <TextButton
          variant="solid"
          color="primary"
          onClick={() => form.submit()}
          style={{ width: "10em" }}
        >
          Search
        </TextButton>
      </Flex>
    </Form>
  );
};

const SearchContent = ({
  categoryListProps,
}: {
  categoryListProps: CategoryListProps;
}) => {
  const { characters, isLoading } = useContext(CharactersContext);

  useFetchCharacters();

  return (
    <Spin spinning={isLoading}>
      <Flex vertical gap={"middle"}>
        <CategoryList {...categoryListProps} />
        <Flex wrap gap="middle">
          {characters.map((character) => {
            const { id, author, ...characterProps } = character;

            return (
              <CharacterCard
                {...characterProps}
                key={id}
                author={{
                  name: author.name,
                  profilePic: author.profilePic,
                }}
              />
            );
          })}
        </Flex>
        <TextButton
          style={{ alignSelf: "center", padding: "1.5em 4em" }}
          size="large"
          color="primary"
          variant="solid"
        >
          View more
        </TextButton>
      </Flex>
    </Spin>
  );
};

export const ShoppingSection = () => {
  const [currentCategory, setCurrentCategory] = useState(Category.COMMON);
  const [characters, dispatch] = useReducer<
    Reducer<
      CharacterReducerState,
      {
        type: CharactersActionType;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        payload?: any;
      }
    >
  >(charactersReducer, initialCharacterReducerState);

  return (
    <CharactersContext.Provider value={characters}>
      <CharactersDispatchContext.Provider value={dispatch}>
        <Flex
          style={{ padding: "2em 3em", zIndex: 10 }}
          justify="center"
          gap="large"
        >
          <Flex flex={1}>
            <SearchAndFilter />
          </Flex>
          <Flex flex={3}>
            <SearchContent
              categoryListProps={{
                categories: [Category.COMMON, Category.EPIC, Category.RARE],
                selectedCategory: currentCategory,
                onCategorySelect: (category) => setCurrentCategory(category),
              }}
            />
          </Flex>
        </Flex>
        <img
          src="/page-background.png"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            objectFit: "cover",
            filter: "opacity(30%)",
          }}
        />
      </CharactersDispatchContext.Provider>
    </CharactersContext.Provider>
  );
};
