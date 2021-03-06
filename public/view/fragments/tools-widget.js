/*
 * Copyright (C) 2020  Anthony DeDominic <adedomin@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const html = require('choo/html');
const { tools, toolsMobile } = require('../../use/stores/tools.js');
const { isMobile } = require('../../lib/helpers.js');

function wrap(partial) {
    return html`
        <div class="field has-addons has-addons-centered">
            ${partial}
        </div>
    `;
}

function toolbar(state, emit, tool) {
    return wrap(tool.map(tool => {
        let extra = '';
        if (tool === state.painter.tool) {
            extra += ' is-info';
        }
        else if (tool === 'grid' && state.painter.grid) {
            extra += ' is-success';
        }
        else if (tool === 'hd' && state.moose.hd) {
            extra += ' is-success';
        }
        else if (tool === 'shaded' && state.moose.shaded) {
            extra += ' is-success';
        }
        else if (tool === '82c' && state.moose.extended) {
            extra += ' is-success';
        }
        else if (tool === 'clear') {
            extra += ' is-danger';
        }

        return html`<p class="control">
        <button onclick=${toolSelect} class="button ${extra}">
            ${tool}
        </button>
        </p>`;
    }));

    function toolSelect(e) {
        emit('tool-select', e.target.innerText);
    }
}

function mobileToolbar(state, emit) {
    const topBar = toolbar(state, emit, toolsMobile[0]);
    const bottomBar = toolbar(state, emit, toolsMobile[1]);
    return html`<div>
        ${topBar}
        ${bottomBar}<br>
    </div>`;
}

module.exports = function(state, emit) {
    return !isMobile() ?
        toolbar(state, emit, tools) :
        mobileToolbar(state, emit);
};
