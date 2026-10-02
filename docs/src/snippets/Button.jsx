import {
    Root,
    Button,
    ButtonLink,
    Fab,
    IconButton,
    Link,
    CheckboxButton,
    RadioButton,
    Switch,
} from "@wq/material";

export default function ButtonSnippet() {
    return (
        <Root>
            <Button>Button</Button>
            <ButtonLink href="#">Button Link</ButtonLink>
            <Fab icon="add" />
            <IconButton icon="add" />
            <Link href="#">Link</Link>
            <CheckboxButton />
            <RadioButton />
            <Switch />
        </Root>
    );
}
