/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: entities,dialog,tabletools,toolbar */

( function() {
	'use strict';

	bender.editor = {
		config: {
			removePlugins: 'tableselection'
		},
		allowedForTests: 'table[width];td[id]'
	};

	bender.test( {
		doTest: function( name, command ) {
			var bot = this.editorBot;
			bender.tools.testInputOut( name, function( source, expected ) {
				bot.setHtmlWithSelection( source );
				bot.execCommand( command );

				var output = bot.getData( true );
				output = output.replace( /\u00a0/g, '&nbsp;' );
				assert.areSame( bender.tools.compatHtml( expected ), output );
			} );
		},

		'test insert row before': function() {
			this.doTest( 'add-row-before', 'rowInsertBefore' );
			this.doTest( 'add-row-before-2', 'rowInsertBefore' );
			this.doTest( 'add-row-before-3', 'rowInsertBefore' );
			this.doTest( 'add-row-before-multi', 'rowInsertBefore' );
		},

		'test insert row after': function() {
			this.doTest( 'add-row-after', 'rowInsertAfter' );
			this.doTest( 'add-row-after-2', 'rowInsertAfter' );
			this.doTest( 'add-row-after-3', 'rowInsertAfter' );
			this.doTest( 'add-row-after-multi', 'rowInsertAfter' );
		},

		'test insert col before': function() {
			this.doTest( 'add-col-before', 'columnInsertBefore' );
			this.doTest( 'add-col-before-2', 'columnInsertBefore' );
			this.doTest( 'add-col-before-3', 'columnInsertBefore' );
			this.doTest( 'add-col-before-4', 'columnInsertBefore' );
			this.doTest( 'add-col-before-multi', 'columnInsertBefore' );
			this.doTest( 'add-col-before-multi2', 'columnInsertBefore' );
		},

		'test insert col after': function() {
			this.doTest( 'add-col-after', 'columnInsertAfter' );
			this.doTest( 'add-col-after-2', 'columnInsertAfter' );
			this.doTest( 'add-col-after-3', 'columnInsertAfter' );
			this.doTest( 'add-col-after-4', 'columnInsertAfter' );
			this.doTest( 'add-col-after-multi', 'columnInsertAfter' );
		},

		'test merge cells': function() {
			this.doTest( 'merge-cells', 'cellMerge' );
		},

		'test merge cells (2)': function() {
			if ( !CKEDITOR.env.gecko )
				assert.ignore();

			this.doTest( 'merge-cells-2', 'cellMerge' );
		},

		'test merge cells (3)': function() {
			this.doTest( 'merge-cells-3', 'cellMerge' );
		},

		'test merge cells (4)': function() {
			if ( !CKEDITOR.env.gecko )
				assert.ignore();

			this.doTest( 'merge-cells-4', 'cellMerge' );
		},

		'test merge cells (5)': function() {
			if ( !CKEDITOR.env.gecko )
				assert.ignore();

			this.doTest( 'merge-cells-5', 'cellMerge' );
		},

		'test merge cells (6)': function() {
			this.doTest( 'merge-cells-6', 'cellMerge' );
		},

		'test split cells': function() {
			this.doTest( 'split-cells', 'cellHorizontalSplit' );
		},

		'test split cells (2)': function() {
			this.doTest( 'split-cells-2', 'cellHorizontalSplit' );
		},

		'test split cells (3)': function() {
			this.doTest( 'split-cells-3', 'cellHorizontalSplit' );
		},

		'test split cells (4)': function() {
			this.doTest( 'split-cells-4', 'cellVerticalSplit' );
		},

		'test split cells (5)': function() {
			this.doTest( 'split-cells-5', 'cellVerticalSplit' );
		},

		'test split cells (6)': function() {
			this.doTest( 'split-cells-6', 'cellVerticalSplit' );
		},

		'test split cells (7)': function() {
			var bot = this.editorBot;
			bender.tools.testInputOut( 'split-cells-7', function( source, expected ) {
				bot.setHtmlWithSelection( source );
				bot.execCommand( 'cellHorizontalSplit' );

				var range = new CKEDITOR.dom.range( bot.editor.document );
				range.moveToPosition( bot.editor.document.getById( 'cursor' ), CKEDITOR.POSITION_AFTER_START );
				range.select();

				bot.execCommand( 'cellVerticalSplit' );
				assert.areSame( bender.tools.compatHtml( expected ), bot.getData( true ) );
			} );
		},

		// (http://dev.ckeditor.com/ticket/11438)
		'test split cells (8)': function() {
			this.doTest( 'split-cells-8', 'cellHorizontalSplit' );
		},

		'test split cells (9)': function() {
			this.doTest( 'split-cells-9', 'cellHorizontalSplit' );
		},

		// (http://dev.ckeditor.com/ticket/6111)
		'test merge one cell': function() {
			this.doTest( 'merge-cell-right', 'cellMergeRight' );
			this.doTest( 'merge-cell-down', 'cellMergeDown' );
		},

		// (http://dev.ckeditor.com/ticket/6228)
		'test merge one cell (2)': function() {
			this.doTest( 'merge-cell-down-2', 'cellMergeDown' );
		},

		// (http://dev.ckeditor.com/ticket/8675)
		'test delete nested cells': function() {
			this.doTest( 'delete-nested-cells', 'cellDelete' );
		},

		// (http://dev.ckeditor.com/ticket/8675)
		'test delete nested cells (2)': function() {
			this.doTest( 'delete-nested-cells-2', 'cellDelete' );
		},

		// (http://dev.ckeditor.com/ticket/8675)
		// Check if moveOutOfCellGuard works as expected.
		'test delete nested cells (3)': function() {
			this.doTest( 'delete-nested-cells-3', 'cellDelete' );
		},

		// (http://dev.ckeditor.com/ticket/8675)
		// Test th and caption handling while deleting cells.
		'test delete nested cells (4)': function() {
			this.doTest( 'delete-nested-cells-4', 'cellDelete' );
		},

		// (http://dev.ckeditor.com/ticket/10308, http://dev.ckeditor.com/ticket/11058)
		// To reproduce http://dev.ckeditor.com/ticket/11058 we need 4 rows in the table.
		'test remove row from middle row': function() {
			this.doTest( 'delete-row-from-middle', 'rowDelete' );
		},

		// (http://dev.ckeditor.com/ticket/10308)
		'test remove trailing column': function() {
			this.doTest( 'delete-column-trailing', 'columnDelete' );
		},

		// (http://dev.ckeditor.com/ticket/10308)
		'test remove trailing cell': function() {
			this.doTest( 'delete-cell-trailing', 'cellDelete' );
		},

		'test background color conversion': function() {
			var bot = this.editorBot;

			bender.tools.testInputOut( 'background-conversion', function( source, expected ) {
				bot.setHtmlWithSelection( source );
				assert.beautified.html( expected, bot.getData( true ) );
			} );
		},

		// (http://dev.ckeditor.com/ticket/16971)
		'test background color extraction': function() {
			var bot = this.editorBot;

			bender.tools.testInputOut( 'background-extraction', function( source, expected ) {
				if ( CKEDITOR.env.ie && CKEDITOR.env.version === 8 ) {
					// Just a regular IE quirks.
					expected = expected.replace( 'no-repeat center #00cc99', '#00cc99 no-repeat center 50%' );
				}
				bot.setHtmlWithSelection( source );
				assert.beautified.html( expected, bot.getData( true ) );
			} );
		},

		'test valign conversion': function() {
			var bot = this.editorBot;

			bender.tools.testInputOut( 'align-conversion', function( source, expected ) {
				bot.setHtmlWithSelection( source );
				assert.beautified.html( expected, bot.getData( true ) );
			} );
		},

		// (http://dev.ckeditor.com/ticket/16818)
		'test row height conversion': function() {
			var bot = this.editorBot;

			bender.tools.testInputOut( 'row-height-conversion', function( source, expected ) {
				bot.setHtmlWithSelection( source );
				assert.beautified.html( expected, bot.getData( true ) );
			} );
		}
	} );
} )();
