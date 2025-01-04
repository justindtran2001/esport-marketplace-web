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
import { Category, Character } from "@/data/models";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import useCharacters from "@/hooks/useCharacters";

const tierOptions: DefaultOptionType[] = [
  {
    label: "all",
    value: "tier-all",
  },
];
const themeOptions: DefaultOptionType[] = [
  {
    label: "Halloween",
    value: "theme-halloween",
  },
  {
    label: "Christmas",
    value: "theme-christmas",
  },
];
const timeOptions: DefaultOptionType[] = [
  {
    label: "Latest",
    value: "time-latest",
  },
];
const priceOptions: DefaultOptionType[] = [
  {
    label: "Low to high",
    value: "price-low-to-high",
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

  const onFinish = (values: unknown) => {
    //TODO: Integrate search API
    console.log("🚀 ~ SearchAndFilter ~ values:", values);
  };

  return (
    <Flex flex={1} vertical>
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
    </Flex>
  );
};

const SearchContent = ({
  categoryListProps,
  characters,
}: {
  categoryListProps: CategoryListProps;
  characters: Character[];
}) => {
  return (
    <Flex flex={3} vertical gap={"middle"}>
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
  );
};

export const ShoppingSection = () => {
  const [characters, loading] = useCharacters();
  const [currentCategory, setCurrentCategory] = useState(Category.COMMON);

  return (
    <Spin spinning={loading}>
      <Flex
        style={{ padding: "2em 3em", zIndex: 10 }}
        justify="center"
        gap="large"
      >
        <SearchAndFilter />
        <SearchContent
          categoryListProps={{
            categories: [Category.COMMON, Category.EPIC, Category.RARE],
            selectedCategory: currentCategory,
            onCategorySelect: (category) => setCurrentCategory(category),
          }}
          characters={characters}
        />
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
    </Spin>
  );
};
