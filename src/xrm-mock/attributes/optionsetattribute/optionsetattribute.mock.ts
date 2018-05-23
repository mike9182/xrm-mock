import { OptionSetValueMock } from "../../optionsetvalue/optionsetvalue.mock";
import { ControlMock } from "../../page/control/control.mock";
import { OptionSetControlMock } from "../../page/optionsetcontrol/optionsetcontrol.mock";
import { EnumAttributeMock, IEnumAttributeComponents } from "../enumattribute/enumattribute.mock";

export class OptionSetAttributeMock extends EnumAttributeMock<OptionSetControlMock, number>
                                    implements Xrm.Page.OptionSetAttribute {
    public static create(name: string, value?: number): OptionSetAttributeMock {
        return new OptionSetAttributeMock({ name, value });
    }

    private static defaultComponents(components: IOptionSetAttributeComponents): IOptionSetAttributeComponents {
        components.attributeType = "optionset";
        return components;
    }

    public options: OptionSetValueMock[];
    public selectedOption: OptionSetValueMock;

    constructor(components: IOptionSetAttributeComponents) {
        super(OptionSetAttributeMock.defaultComponents(components));
        this.options = components.options
            ? components.options.map((o) => {
                return new OptionSetValueMock(o.text, o.value);
            })
            : components.value || components.value === 0
                ? [{
                    text: components.value.toString(),
                    value: components.value,
                }]
                : [];
        this.format = components.format || "language";
        this.selectedOption = this.getOption(this.getValue());
    }

    public getFormat(): Xrm.Page.OptionSetAttributeFormat {
        return super.getFormat() as Xrm.Page.OptionSetAttributeFormat;
    }

    public getOption(param: number | string): Xrm.Page.OptionSetValue {
        return typeof param === "number"
            ? this.options.filter((o) => o.value === param)[0]
            : this.options.filter((o) => o.text === param)[0];
    }

    public getOptions(): Xrm.Page.OptionSetValue[] {
        return this.options;
    }

    public getSelectedOption(): Xrm.Page.OptionSetValue {
        return this.selectedOption;
    }

    public getText(): string {
        return this.selectedOption.text;
    }

    public setValue(value: number): void {
        super.setValue(value);
        this.selectedOption = this.getOption(value);
    }
}

export interface IOptionSetAttributeComponents extends IEnumAttributeComponents<OptionSetControlMock, number> {
    format?: Xrm.Page.OptionSetAttributeFormat;
    options?: Xrm.Page.OptionSetValue[];
    selectedOption?: Xrm.Page.OptionSetValue;
}