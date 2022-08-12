<script>
    import Ckeditor from "ckeditor5-svelte";
    import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor";

    // Setting up editor prop to be sent to wrapper component
    let editor = DecoupledEditor;
    // Reference to initialised editor instance
    let editorInstance = null;
    // Setting up any initial data for the editor
    let editorData = null;

    // If needed, custom editor config can be passed through to the component
    // Uncomment the custom editor config if you need to customise the editor.
    // Note: If you don't pass toolbar object then Document editor will use default set of toolbar items.
    let editorConfig = {
        toolbar: {
            items: [
                "heading",
                "bold",
                "italic",
                "fontSize",
                'blockQuote',
                'link',
                'imageupload',
                'bulletedList',
                'numberedList',
            ],
            shouldNotGroupWhenFull: true,

        },
        placeholder: 'Type the content here!',
    };

    function onReady({ detail: editor }) {
        editorInstance = editor;
        editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }
</script>
<div class=" h-[200px] pr-[15px] pl-[15px] mt-[15px]">
    <Ckeditor
            bind:editor
            on:ready={onReady}
            bind:config={editorConfig}
            bind:value={editorData}
    />
</div>
