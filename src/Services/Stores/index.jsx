import { useState, createContext, useReducer, useEffect } from "react";

// Translation
import { useTranslation } from "react-i18next";

// Reducers
import { ReducerInit, Reducer } from "./reducer";

// Context
export const Store = createContext({});

const StoreProvider = ({ children }) => {
    const { t } = useTranslation(["Global"]);
    const [ setting, setSetting ] = useState();
    const [ gridLocaleText, setGridLocaleText ] = useState({});
    const [ data, dispatch ] = useReducer(Reducer, ReducerInit);
    const [ activeModule, setActiveModule ] = useState(localStorage?.module);

    // Set Grid LocaleText
    useEffect(() => {
        setGridLocaleText({
            toolbarNew: t("Global:toolbarNew"),
            noRowsLabel: t("Global:noRowsLabel"),
            toolbarExport: t("Global:toolbarExport"),
            modalAddTitle: t("Global:modalAddTitle"),
            submitButton: t("Global:modalEditButton"),
            toolbarColumns: t("Global:toolbarColumns"),
            toolbarFilters: t("Global:toolbarFilters"),
            modalAddButton: t("Global:modalAddButton"),
            modalEditTitle: t("Global:modalEditTitle"),
            paginationLabel: t("Global:paginationLabel"),
            modalEditButton: t("Global:modalEditButton"),
            columnMenuFilter: t("Global:columnMenuFilter"),
            gridHeaderAction: t("Global:gridHeaderAction"),
            modalDeleteTitle: t("Global:modalDeleteTitle"),
            toolbarExportCSV: t("Global:toolbarExportCSV"),
            filterOperatorIs: t("Global:filterOperatorIs"),
            columnMenuSortAsc: t("Global:columnMenuSortAsc"),
            paginationLabelOf: t("Global:paginationLabelOf"),
            modalDeleteButton: t("Global:modalDeleteButton"),
            filterOperatorNot: t("Global:filterOperatorNot"),
            columnMenuSortDesc: t("Global:columnMenuSortDesc"),
            filterPanelColumns: t("Global:filterPanelColumns"),
            modalDeleteMessage: t("Global:modalDeleteMessage"),
            toolbarExportPrint: t("Global:toolbarExportPrint"),
            toolbarExportLabel: t("Global:toolbarExportLabel"),
            filterPanelOperator: t("Global:filterPanelOperator"),
            toolbarColumnsLabel: t("Global:toolbarColumnsLabel"),
            columnMenuHideColumn: t("Global:columnMenuHideColumn"),
            filterOperatorEquals: t("Global:filterOperatorEquals"),
            filterPanelInputLabel: t("Global:filterPanelInputLabel"),
            filterOperatorIsAnyOf: t("Global:filterOperatorIsAnyOf"),
            filterOperatorIsEmpty: t("Global:filterOperatorIsEmpty"),
            noResultsOverlayLabel: t("Global:noResultsOverlayLabel"),
            filterOperatorEndsWith: t("Global:filterOperatorEndsWith"),
            headerFilterOperatorIs: t("Global:headerFilterOperatorIs"),
            filterOperatorContains: t("Global:filterOperatorContains"),
            columnMenuManageColumns: t("Global:columnMenuManageColumns"),
            headerFilterOperatorNot: t("Global:headerFilterOperatorNot"),
            filterOperatorStartsWith: t("Global:filterOperatorStartsWith"),
            filterOperatorIsNotEmpty: t("Global:filterOperatorIsNotEmpty"),
            toolbarFiltersTooltipShow: t("Global:toolbarFiltersTooltipShow"),
            toolbarFiltersTooltipHide: t("Global:toolbarFiltersTooltipHide"),
            columnsPanelTextFieldLabel: t("Global:columnsPanelTextFieldLabel"),
            filterPanelDeleteIconLabel: t("Global:filterPanelDeleteIconLabel"),
            filterPanelInputPlaceholder: t("Global:filterPanelInputPlaceholder"),
            columnsManagementSearchTitle: t("Global:filterPanelInputPlaceholder"),
            columnsManagementShowHideAllText: t("Global:columnsManagementShowHideAll"),
            columnsPanelTextFieldPlaceholder: t("Global:columnsPanelTextFieldPlaceholder")
        })
    }, [t]);

    return (
        <Store.Provider value={{ setting, setSetting, data, dispatch, gridLocaleText, activeModule, setActiveModule }}>
            {children}
        </Store.Provider>
    )
}

export default StoreProvider;