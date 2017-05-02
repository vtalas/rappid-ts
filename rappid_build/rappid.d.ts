// Definitions by:
// Aidan Reel <http://github.com/areel>,
// David Durman <http://github.com/DavidDurman>,
// Ewout Van Gossum <https://github.com/DenEwout>,
// Federico Caselli <https://github.com/CaselIT>,
// Chris Moran <https://github.com/ChrisMoran>
// Michael MacFadden https://github.com/mmacfadden

// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// typings: https://github.com/CaselIT/typings-jointjs

/// <reference types="backbone" />

import * as Backbone from "backbone";

export as namespace joint;

export namespace g {

    type CardinalDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';

    function normalizeAngle(angle: number): number;

    function snapToGrid(val: number, gridSize: number): number;

    function toDeg(rad: number): number;

    function toRad(deg: number, over360?: boolean): number;

    namespace bezier {
        function curveThroughPoints(points: dia.Point[] | Point[]): string[];

        export function getCurveControlPoints(points: dia.Point[] | Point[]): [Point[], Point[]];

        interface ICurveDivider {
            p0: Point;
            p1: Point;
            p2: Point;
            p3: Point;
        }
        export function getCurveDivider(p0: string | dia.Point | Point, p1: string | dia.Point | Point, p2:
                                            string
                                            | dia.Point
                                            | Point, p3:
                                            string
                                            | dia.Point
                                            | Point): (t: number) => [ICurveDivider, ICurveDivider];

        export function getFirectControlPoints(rhs: number[]): number[];

        export function getInversionSolver(p0: dia.Point | Point, p1: dia.Point | Point, p2: dia.Point | Point, p3:
                                               dia.Point
                                               | Point): (p: dia.Point | Point) => number;
    }

    class Ellipse {
        static fromRect(rect: Rect): Ellipse;

        x: number;
        y: number;
        a: number;
        b: number;

        constructor(c, a, b);

        bbox(): Rect;

        clone(): Ellipse;

        normalizedDistance(point: dia.Point | Point): number;

        inflate(dx: number, dy: number): this;

        containsPoint(p: dia.Point | Point): boolean;

        center(): Point;

        tangentTheta(p: dia.Point | Point): number;

        equals(ellipse: Ellipse): boolean;

        intersectionWithLineFromCenterToPoint(p: dia.Point | Point, angle: number): Point;

        toString(): string;
    }

    class Line {
        start: Point;
        end: Point;

        constructor(p1: string | dia.Point | Point, p2: string | dia.Point | Point);

        bearing(): CardinalDirection;

        clone(): Line;

        equals(line: Line): boolean;

        intersect(line: Line): Point | undefined;
        intersect(rect: Rect): Point[] | undefined;

        length(): number;

        midpoint(): Point;

        pointAt(t: number): Point;

        pointOffset(p: dia.Point | Point): number;

        squaredLength(): number;

        toString(): string;
    }

    class Point {
        static fromPolar(distance: number, angle: number, origin?: string | dia.Point | Point): Point;

        static random(x1: number, x2: number, y1: number, y2: number): Point;

        x: number;
        y: number;

        constructor(x: number | string | Point, y?: number);

        adhereToRect(r: Rect): this;

        bearing(p: Point): CardinalDirection;

        changeInAngle(dx: number, dy: number, ref: string | dia.Point | Point): number;

        clone(): Point;

        difference(dx: dia.Point | Point | number, dy?: number): Point;

        distance(p: string | dia.Point | Point): number;

        equals(p: Point): boolean;

        magnitude(): number;

        manhattanDistance(p: dia.Point | Point): number;

        move(ref: string | dia.Point | Point, distance: number): this;

        normalize(length: number): this;

        offset(dx: number | dia.Point | Point, dy?: number): this;

        reflection(ref: string | dia.Point | Point): Point;

        rotate(origin: string | dia.Point | Point, angle: number): this;

        round(precision: number): this;

        scale(sx: number, sy: number, origin: string | dia.Point | Point): this;

        snapToGrid(gx: number, gy?: number): this;

        theta(p: string | dia.Point | Point): number;

        toJSON(): dia.Point;

        toPolar(origin: string | dia.Point | Point): this;

        toString(): string;

        update(x: number, y: number): this;
    }

    class Rect {
        static fromEllipse(e: Ellipse): Rect;

        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x?: number | dia.BBox, y?: number, w?: number, h?: number);

        bbox(angle: number): Rect;

        bottomLeft(): Point;

        bottomLine(): Line;

        bottomMiddle(): Point;

        center(): Point;

        clone(): Rect;

        containsPoint(p: string | dia.Point | Point): boolean;

        containsRect(r: dia.BBox | Rect): boolean;

        corner(): Point;

        equals(r: dia.BBox | Rect): boolean;

        intersect(r: Rect): Rect | undefined;

        intersectionWithLineFromCenterToPoint(p: string | dia.Point | Point, angle: number): Point;

        leftLine(): Line;

        leftMiddle(): Point;

        moveAndExpand(r: dia.BBox | Rect): this;

        inflate(dx?: number, dy?: number): this;

        normalize(): this;

        origin(): Point;

        pointNearestToPoint(point: string | dia.Point | Point): Point;

        rightLine(): Line;

        rightMiddle(): Point;

        round(precision: number): this;

        scale(sx: number, sy: number, origin?: string | dia.Point | Point): this;

        sideNearestToPoint(point: string | dia.Point | Point): 'left' | 'right' | 'top' | 'bottom';

        snapToGrid(gx: number, gy?: number): this;

        topLine(): Line;

        topMiddle(): Point;

        topRight(): Point;

        toJSON(): dia.BBox;

        toString(): string;

        union(rect: Rect): Rect;
    }

    namespace scale {
        function linear(domain: number[], range: number[], value: number): number;
    }

    function ellipse(c: number, a: number, b: number): Ellipse;

    function line(start: dia.Point | Point, end: dia.Point | Point): Line

    function point(x: number, y: number): Point;
    function point(xy: string): Point;
    function point(point: dia.Point): Point;

    function rect(x: number, y: number, w: number, h: number): Rect;
    function rect(rect: dia.BBox): Rect;
}

export function V(svg: SVGElement | string, attrs?: Object, children?:
                      Vectorizer
                      | Vectorizer[]
                      | SVGElement
                      | SVGElement[]): Vectorizer;

export namespace Vectorizer {

    interface RotateOptions {
        absolute: boolean;
    }

    interface Sample {
        x: number;
        y: number;
        distance: number;
    }
    interface TextAnnotation {
        start: number;
        end: number;
        attrs: object;
    }
    interface TextOptions {
        lineHeight: number | string;
        textPath: string | object;
        annotations: TextAnnotation[];
        includeAnnotationIndices: boolean;
    }
    interface TransformOptions {
        absolute: boolean;
    }
    // modifiable Matrix. SVGMatrix doesn't allow set on properties or a constructor.
    interface Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
    }
    interface DecomposedTransformation {
        translateX: number;
        translateY: number;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        rotation: number;
    }
    interface Rect extends dia.BBox {
        'top-rx'?: number;
        'top-ry'?: number;
        'bottom-rx'?: number;
        'bottom-ry'?: number;
    }
    interface Rotation {
        angle: number;
        cx?: number;
        cy?: number;
    }
    interface Translation {
        tx: number;
        ty: number;
    }
    interface Scale {
        sx: number;
        sy: number;
    }
    interface Transform {
        value: string;
        translate: Translation;
        rotate: Rotation;
        scale: Scale;
    }
    interface ParseXMLOptions {
        async: boolean;
    }
    interface QualifiedAttribute {
        ns?: string;
        local: string;
    }
}

export class Vectorizer {
    constructor(svg: string | SVGElement, attrs?: Object, children?:
                    Vectorizer
                    | Vectorizer[]
                    | SVGElement
                    | SVGElement[]);

    node: SVGElement;

    animateAlongPath(attrs: Object, path: Vectorizer | SVGElement): void;

    append(node: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    attr(): object;
    attr(name: string): string | number | object;
    attr(name: string, value: string | number): this;
    attr(attrs: object): this;

    addClass(className: string): Vectorizer;

    bbox(withoutTransformations?: boolean, target?: SVGElement | Vectorizer): g.Rect;

    before(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    clone(): Vectorizer;

    contains(el: SVGElement): boolean;

    convertToPath(): Vectorizer;

    convertToPathData(): string;

    defs(): Vectorizer | undefined;

    empty(): this;

    find(selector: string): Vectorizer[];

    findIntersection(ref: dia.Point, target: SVGElement | Vectorizer): dia.Point | undefined;

    findOne(selector: string): Vectorizer | undefined;

    findParentByClass(className: string, ternimator: SVGElement): Vectorizer | undefined;

    getTransformToElement(elem: SVGGElement | Vectorizer): SVGMatrix;

    hasClass(className: string): boolean;

    index(): number;

    prepend(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    remove(): this;

    removeAttr(name: string): this;

    removeClass(className: string): this;

    rotate(): Vectorizer.Rotation;

    rotate(angle: number, cx?: number, cy?: number, opt?: Vectorizer.RotateOptions): this;

    sample(interval: number): Vectorizer.Sample[];

    scale(): Vectorizer.Scale;

    scale(sx: number, sy: number): this;

    setAttribute(name: string, value: string): this;

    setAttributes(attrs: object): this;

    // returns either this or Vectorizer, no point in specifying this.
    svg(): Vectorizer;

    text(content: string, opt: Vectorizer.TextOptions): this;

    toggleClass(className: string, switchArg?: boolean): this;

    toLocalPoint(x: number, y: number): dia.Point;

    transform(): SVGMatrix;

    transform(matrix: SVGMatrix, opt?: Vectorizer.TransformOptions): this;

    translate(): Vectorizer.Translation;

    translate(tx: number, ty?: number, opt?: Vectorizer.TransformOptions): this;

    translateAndAutoOrient(position: dia.Point, reference: dia.Point, target?: SVGElement): this;

    translateCenterToPoint(p: dia.Point): void;

    static convertCircleToPathData(circle: string | SVGElement): string;

    static convertEllipseToPathData(ellipse: string | SVGElement): string;

    static convertLineToPathData(line: string | SVGElement): string;

    static convertPolylineToPathData(line: string | SVGElement): string;

    static convertPolygonToPathData(line: string | SVGElement): string;

    static convertRectToPathData(rect: string | SVGElement): string;

    static createSlicePathData(innerRadius: number, outRadius: number, startAngle: number, endAngle: number): string;

    static createSVGDocument(content: string): Document;

    static createSVGMatrix(extension: Vectorizer.Matrix): SVGMatrix;

    static createSVGPoint(x: number, y: number): SVGPoint;

    static createSVGTransform(matrix?: Vectorizer.Matrix | SVGMatrix): SVGTransform;

    static decomposeMatrix(matrix: SVGMatrix): Vectorizer.DecomposedTransformation;

    static deltaTransformPoint(matrix: SVGMatrix | Vectorizer.Matrix, point: SVGPoint | dia.Point): dia.Point;

    static ensureId(node: SVGElement): string;

    static findAnnotationsAtIndex(annotations: Vectorizer.TextAnnotation[], start: number, end: number): Vectorizer.TextAnnotation;

    static findAnnotationsBetweenIndexes(annotations: Vectorizer.TextAnnotation[], start: number, end: number): Vectorizer.TextAnnotation;

    static getPointsFromSvgNode(node: SVGElement): SVGPoint[];

    static isArray(value: any): boolean;

    static isObject(value: any): boolean;

    static isString(value: any): boolean;

    static isUndefined(value: any): boolean;

    static isV(value: any): boolean;

    static isVElement(object: any): boolean;

    static matrixToRotate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Rotation;

    static matrixToScale(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Scale;

    static matrixToTransformString(matrix: SVGMatrix | Vectorizer.Matrix): string;

    static matrixToTranslate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Translation;

    static mergeAttrs(a: Object, b: Object): Object;

    static parseTransformString(transform: string): Vectorizer.Transform;

    static parseXML(data: string, opt?: Vectorizer.ParseXMLOptions): XMLDocument;

    static qualifyAttr(name: string): Vectorizer.QualifiedAttribute;

    static rectToPath(r: Vectorizer.Rect): string;

    static sanitizeText(text: string): string;

    static shiftAnnotations(annotations: Vectorizer.TextAnnotation[], index: number, offset: number): Vectorizer.TextAnnotation[];

    static styleToObject(styleString: string): object;

    static svgPointsToPath(points: dia.Point[] | SVGPoint[]): string;

    static toNode(el: Vectorizer | SVGElement | SVGElement[]): SVGElement;

    static transformPoint(p: dia.Point | g.Point, matrix: SVGMatrix): g.Point;

    static transformRect(r: Vectorizer.Rect, matrix: SVGMatrix): g.Rect;

    static transformStringToMatrix(transform: string): SVGMatrix;

    static uniqueId(): string;
}

export namespace dia {
    interface Size {
        width: number;
        height: number;
    }

    interface Point {
        x: number;
        y: number;
    }

    interface BBox extends Point, Size {
    }

    interface TranslateOptions {
        restrictedArea?: BBox;
        transition?: TransitionOptions;
    }

    interface TransitionOptions {
        delay?: number;
        duration?: number;
        timingFunction?: (t: number) => number;
        valueFunction?: (a: any, b: any) => (t: number) => any;
    }

    interface DfsBfsOptions {
        inbound?: boolean;
        outbound?: boolean;
        deep?: boolean;
    }

    interface ExploreOptions {
        breadthFirst?: boolean;
        deep?: boolean;
    }

    interface EdgeMap {
        [key: string]: boolean;
    }

    class Graph extends Backbone.Model {
        constructor(attributes?: any, options?: { cellNamespace: any, cellModel: typeof Cell });

        addCell(cell: Cell | Cell[], opt?: object): this;

        addCells(cells: Cell[], opt: object): this;

        resetCells(cells: Cell[], options?: object): this;

        getCell(id: string): Cell;

        getElements(): Element[];

        getLinks(): Link[];

        getCells(): Cell[];

        getFirstCell(): Cell;

        getLastCell(): Cell;

        getConnectedLinks(element: Cell, options?: { inbound?: boolean, outbound?: boolean, deep?: boolean }): Link[];

        disconnectLinks(cell: Cell, options?: object): void;

        removeLinks(cell: Cell, options?: object): void;

        translate(tx: number, ty?: number, options?: TranslateOptions): void;

        cloneCells(cells: Cell[]): { [id: string]: Cell };

        getSubgraph(cells: Cell[], options?: { deep?: boolean }): Cell[];

        cloneSubgraph(cells: Cell[], options?: { deep?: boolean }): { [id: string]: Cell };

        dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: DfsBfsOptions, visited?: Object, distance?: number): void;

        bfs(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: DfsBfsOptions): void;

        search(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: { breadthFirst?: boolean }): void;

        getSuccessors(element: Element, options?: ExploreOptions): Element[];

        getPredecessors(element: Element, options?: ExploreOptions): Element[];

        isSuccessor(elementA: Element, elementB: Element): boolean;

        isPredecessor(elementA: Element, elementB: Element): boolean;

        isSource(element: Element): boolean;

        isSink(element: Element): boolean;

        getSources(): Element[];

        getSinks(): Element[];

        getNeighbors(element: Element, options?: DfsBfsOptions): Element[];

        isNeighbor(elementA: Element, elementB: Element, options?: { inbound?: boolean, outbound?: boolean; }): boolean;

        getCommonAncestor(...cells: Cell[]): Element;

        toJSON(): object;

        fromJSON(json: {cells: Cell[]}, options?: object): this;

        clear(options?: object): this;

        findModelsFromPoint(p: Point): Element[];

        findModelsUnderElement(element: Element, options?: {
                                   searchBy?: 'bottomLeft' | 'bottomMiddle' | 'center' |
                                              'corner' | 'leftMiddle' | 'origin' | 'rightMiddle' |
                                              'topMiddle' | 'topRight'
                               }): Element[];

        getBBox(elements: Element[], options?: {deep?: boolean}): g.Rect;

        toGraphLib(): object; // graphlib graph object
        findModelsInArea(rect: g.Rect | BBox, options?: {strict?: boolean}): BBox | boolean;

        getCellsBBox(cells: Cell[], options?: {deep?: boolean}): g.Rect;

        getInboundEdges(node: string): EdgeMap;

        getOutboundEdges(node: string): EdgeMap;

        hasActiveBatch(name?: string): number | boolean;

        maxZIndex(): number;

        removeCells(cells: Cell[], options?: object): this;

        resize(width: number, height: number, options?: object): this;

        resizeCells(width: number, height: number, cells: Cell[], options?: object): this;

        set(key: object | string, value: any, options?: object): this;

        startBatch(name: string, data?: Object): any;

        stopBatch(name: string, data?: Object): any;
    }

    class Cell extends Backbone.Model {
        constructor(attributes?: object, options?: object);

        id: string;

        toJSON(): object;

        remove(options?: { disconnectLinks?: boolean }): this;

        toFront(options?: { deep?: boolean }): this;

        toBack(options?: { deep?: boolean }): this;

        getAncestors(): Cell[];

        isEmbeddedIn(element: Element, options?: { deep: boolean }): boolean;

        prop(key: string | string[]): any;
        prop(object: object): this;
        prop(key: string | string[], value: any, options?: object): this;

        removeProp(path: string | string[], options?: object): this;

        attr(key: string): any;
        attr(object: SVGAttributes): this;
        attr(key: string, value: any): this;

        clone(): Cell;
        clone(opt: { deep?: boolean }): Cell | Cell[];

        removeAttr(path: string | string[], options?: object): this;

        transition(path: string, value?: any, options?: TransitionOptions, delim?: string): number;

        getTransitions(): string[];

        stopTransitions(path?: string, delim?: string): this;

        addTo(graph: Graph, options?: object): this;

        isLink(): boolean;

        embed(cell: Cell, options?: object): this;

        findView(paper: Paper): CellView;

        getEmbeddedCells(options?: {deep?: boolean, breadthFirst?: boolean}): Cell[];

        initialize(options?: {id?: string}): void;

        isElement(): boolean;

        isEmbedded(): boolean;

        processPorts(): void;

        startBatch(name: string, options?: object): this;

        stopBatch(name: string, options?: object): this;

        unembed(cell: Cell, options?: object): this;
    }

    type Padding = number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number
    };

    type Direction = 'left'
                    | 'right'
                    | 'top'
                    | 'bottom'
                    | 'top-right'
                    | 'top-left'
                    | 'bottom-left'
                    | 'bottom-right';

    interface Port {
        id?: string;
        markup?: string;
        group?: string;
        attrs?: object;
        args?: object;
        size?: Size;
        label: {
            size?: Size;
            markup?: string;
            position?: any;
            args?: any;
        }
        z?: number | 'auto';
    }

    interface PortPosition extends Point {
        angle: number;
    }

    class Element extends Cell {
        constructor(attributes?: object, options?: object);

        translate(tx: number, ty?: number, options?: TranslateOptions): this;

        position(options?: { parentRelative: boolean }): g.Point;
        position(x: number, y: number, options?: { parentRelative?: boolean }): this;

        size(): Size;
        size(width: number, height?: number, options?: { direction?: Direction}): this;

        resize(width: number, height: number, options?: { direction?: Direction }): this;

        rotate(deg: number, absolute?: boolean, origin?: Point, opt?: { parentRelative?: boolean }): this;

        embed(cell: Cell): this;

        unembed(cell: Cell): this;

        getEmbeddedCells(options?: ExploreOptions): Cell[];

        fitEmbeds(options?: { deep?: boolean, padding?: Padding }): this;

        getBBox(options?: { deep?: boolean }): g.Rect;

        isElement(): boolean;

        scale(scaleX: number, scaleY: number, origin?: Point, options?: { direction?: Direction, parentRelative?: boolean}): this;

        addPort(port: Port, opt?: object): this;

        addPorts(ports: Port[], opt?: object): this;

        removePort(port: string | Port, opt?: object): this;

        hasPorts(): boolean;

        hasPort(id: string): boolean;

        getPorts(): Port[];

        getPort(id: string): Port;

        getPortsPositions(groupName: string): {[id: string]: PortPosition};

        getPortIndex(port: string | Port): number;

        portProp(portId: string, path: any, value?: any, opt?: any): joint.dia.Element;
    }

    interface CSSSelector {
        [key: string]: string | number | Object; // Object added to support special attributes like filter http://jointjs.com/api#SpecialAttributes:filter
    }

    interface SVGAttributes {
        [selector: string]: CSSSelector;
    }

    interface CellAttributes {
        [key: string]: any;
    }

    interface TextAttrs extends SVGAttributes {
        text?: {
            [key: string]: string | number;
            text?: string;
        };
    }

    interface Label {
        position: number;
        attrs?: TextAttrs;
    }
    interface LinkAttributes extends CellAttributes {
        source?: Point | { id: string, selector?: string, port?: string };
        target?: Point | { id: string, selector?: string, port?: string };
        labels?: Label[];
        vertices?: Point[];
        smooth?: boolean;
        attrs?: TextAttrs;
        z?: number;
    }

    class Link extends Cell {
        markup: string;
        labelMarkup: string;
        toolMakup: string;
        vertexMarkup: string;
        arrowHeadMarkup: string;

        constructor(attributes?: LinkAttributes, options?: Object);

        applyToPoints(fn: (p: Point) => Point, opt?: object): this;

        disconnect(): this;

        label(index?: number): any;
        label(index: number, value: Label, opt?: object): this;

        reparent(options?: object): Element;

        getSourceElement(): undefined | Element | Graph;

        getTargetElement(): undefined | Element | Graph;

        hasLoop(options?: { deep?: boolean }): boolean;

        applyToPoints(fn: Function, options?: any): this;

        getRelationshipAncestor(): undefined | Element;

        isLink(): boolean;

        isRelationshipEmbeddedIn(element: Element): boolean;

        scale(sx: number, sy: number, origin: Point | g.Point | string, opt?: object): this;

        translate(tx: number, ty: number, options?: object): this;
    }

    interface ManhattanRouterArgs {
        excludeTypes?: string[];
        excludeEnds?: 'source' | 'target';
        startDirections?: ['left' | 'right' | 'top' | 'bottom'];
        endDirections?: ['left' | 'right' | 'top' | 'bottom'];
    }

    interface GridOptions {
        color?: string;
        thickness?: number;
        name?: 'dot' | 'fixedDot' | 'mesh' | 'doubleMesh';
        args?: object[] | object;
    }

    interface PaperOptions extends Backbone.ViewOptions<Graph> {
        el?: string | JQuery | HTMLElement;
        width?: number | string;
        height?: number | string;
        origin?: Point;
        gridSize?: number;
        drawGrid?: boolean | GridOptions;
        perpendicularLinks?: boolean;
        elementView?: (element: Element) => typeof ElementView | typeof ElementView;
        linkView?: (link: Link) => typeof LinkView | typeof LinkView;
        defaultLink?: ((cellView: CellView, magnet: SVGElement) => Link) | Link;
        defaultRouter?: ((vertices: Point[], args: Object, linkView: LinkView) => Point[])
            | { name: string, args?: ManhattanRouterArgs };
        defaultConnector?:
            ((sourcePoint: Point, targetPoint: Point, vertices: Point[], args: Object, linkView: LinkView) => string)
            | { name: string, args?: { radius?: number } };
        interactive?: ((cellView: CellView, event: string) => boolean)
            | boolean
            | { vertexAdd?: boolean, vertexMove?: boolean, vertexRemove?: boolean, arrowheadMove?: boolean };
        validateMagnet?: (cellView: CellView, magnet: SVGElement) => boolean;
        validateConnection?: (cellViewS: CellView, magnetS: SVGElement, cellViewT: CellView, magnetT: SVGElement, end:
                                  'source'
                                  | 'target', linkView: LinkView) => boolean;
        linkConnectionPoint?: (linkView: LinkView, view: ElementView, magnet: SVGElement, reference: Point) => Point;
        snapLinks?: boolean | { radius: number };
        linkPinning?: boolean;
        markAvailable?: boolean;
        async?: boolean | { batchZise: number };
        embeddingMode?: boolean;
        findParentBy?: 'bbox' | 'center' | 'origin' | 'corner' | 'topRight' | 'bottomLeft';
        validateEmbedding?: (childView: ElementView, parentView: ElementView) => boolean;
        restrictTranslate?: (elementView: ElementView) => BBox | boolean;
        guard?: (evt: Event, view: CellView) => boolean;
        multiLinks?: boolean;
        cellViewNamespace?: object;
        highlighterNamespace?: object;
        /** useful undocumented option */
        clickThreshold?: number;
        highlighting?: any;
        preventContextMenu?: boolean;
    }

    interface ScaleContentOptions {
        padding?: number;
        preserveAspectRatio?: boolean;
        minScale?: number;
        minScaleX?: number;
        minScaleY?: number;
        maxScale?: number;
        maxScaleX?: number;
        maxScaleY?: number;
        scaleGrid?: number;
        fittingBBox?: BBox;
    }

    interface FitToContentOptions {
        gridWidth?: number;
        gridHeight?: number;
        padding?: Padding;
        allowNewOrigin?: 'negative' | 'positive' | 'any';
        minWidth?: number;
        minHeight?: number;
        maxWidth?: number;
        maxHeight?: number;
    }

    interface Highlighter {
        name: string;
        options?: object;
    }

    class Paper extends Backbone.View<Graph> {
        constructor(options?: PaperOptions);

        options: PaperOptions;
        svg: SVGElement;
        viewport: SVGGElement;
        defs: SVGDefsElement;

        afterRenderViews(): void;

        asyncRenderViews(cells: Cell[], options?: object): void;

        beforeRenderViews(cells: Cell[]): Cell[];

        bindDocumentEvents(): void;

        cellMouseEnter(evt: Event): void;

        cellMouseleave(evt: Event): void;

        cellMouseout(evt: Event): void;

        cellMouseover(evt: Event): void;

        clearGrid(): this;

        clientMatrix(): SVGMatrix;

        clientToLocalPoint(x: number | g.Point, y?: number): g.Point;

        clientToLocalRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        clientOffset(): g.Point;

        cloneOptions(): PaperOptions;

        contextmenu(evt: Event): void;

        createViewForModel(cell: Cell): CellView;

        defineFilter(filter: object): string;

        defineGradient(gradient: object): string;

        defineMarker(marker: object): string;

        drawBackground(opt?: {color?: string, img?: string}): this;

        drawBackgroundImage(img: HTMLImageElement, opt: object): void;

        drawGrid(options?: {width?: number, height?: number, scaleFactor?: number,
                            update: any, ox?: number, oy?: number}): this;

        findView(element: string | JQuery | SVGElement): CellView;

        findViewByModel(model: Cell | string): CellView;

        findViewsFromPoint(point: string | Point | g.Point): ElementView[];

        findViewsInArea(rect: g.Rect | BBox, options?: { strict?: boolean }): CellView[];

        fitToContent(gridWidth?: number, gridHeight?: number, padding?: number, options?: any): void;

        fitToContent(options?: FitToContentOptions): void;

        getArea(): g.Rect;

        getContentBBox(): g.Rect;

        getDefaultLink(cellView: CellView, magnet: HTMLElement): Link;

        getModelById(id: string): Cell;

        getRestrictedArea(): g.Rect | undefined;

        guard(evt: Event, view: CellView): boolean;

        init(): void;

        isDefined(defId: string): boolean;

        linkAllowed(linkViewOrModel: LinkView | Link): boolean;

        localToClientPoint(x: number | g.Point, y?: number): g.Point;

        localToClientRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        localToPagePoint(x: number | g.Point, y?: number): g.Point;

        localToPageRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        localToPaperPoint(x: number | g.Point, y?: number): g.Point;

        localToPaperRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        matrix(): SVGMatrix;

        matrix(ctm: SVGMatrix | Vectorizer.Matrix): this;

        mouseclick(evt: Event): void;

        mousedblclick(evt: Event): void;

        mousewheel(evt: Event): void;

        onCellAdded(cell: Cell, graph: Graph, options: {async?: boolean, position?: number}): void;

        onCellHighlight(cellView: CellView, magnetEl: HTMLElement, options?: {highlighter?: Highlighter}): void;

        onCellUnhighlight(cellView: CellView, magnetEl: HTMLElement, options?: {highlighter?: Highlighter}): void;

        onRemove(): void;

        pageOffset(): g.Point;

        pageToLocalPoint(x: number | g.Point, y?: number): g.Point;

        pageToLocalRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        paperToLocalPoint(x: number | g.Point, y?: number): g.Point;

        paperToLocalRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        pointerdown(evt: Event): void;

        pointermove(evt: Event): void;

        pointerup(evt: Event): void;

        remove(): this;

        removeView(cell: Cell): CellView;

        removeViews(): void;

        render(): this;

        renderView(cell: Cell): CellView;

        resetViews(cellsCollection: Cell[], options: object): void;

        resolveHighlighter(opt: {highlighter?: Highlighter}): boolean | {highlighter: Highlighter, options: object, name: string};

        rotate(): Vectorizer.Rotation;
        rotate(deg: number, ox?: number, oy?: number): this;      // @todo not released yet though it's in the source code already

        scale(): Vectorizer.Scale;
        scale(sx: number, sy?: number, ox?: number, oy?: number): this;

        scaleContentToFit(options?: ScaleContentOptions): void;

        setDimensions(width: number, height: number): void;

        setGrid(drawGrid: GridOptions | GridOptions[]): this;

        setGridSize(gridSize: number): this;

        setInteractivity(value: any): void;

        setOrigin(x: number, y: number): this;

        snapToGrid(x: g.Point | number, y?: number): g.Point;

        sortViews(): void;

        translate(): Vectorizer.Translation;
        translate(tx: number, ty?: number): this;

        unbindDocumentEvents(): void;

        update(): void;

        updateBackgroundColor(color: string): void;

        updateBackgroundImage(opt: {position?: any, size?: any}): void;
    }


    interface GradientOptions {
        type: 'linearGradient' | 'radialGradient';
        stops: Array<{
            offset: string;
            color: string;
            opacity?: number;
        }>;
    }
    class CellViewGeneric<T extends Backbone.Model> extends Backbone.View<T> {
        constructor(options?: {id: string});

        initialize(options?: object): void;

        init(): void;

        getBBox(options?: { useModelGeometry?: boolean }): g.Rect;

        highlight(el?: any, options?: object): this;

        unhighlight(el?: any, options?: object): this;

        addThemeClassName(theme?: string): this;

        applyFilter(selector: string | HTMLElement, filter: object): void;

        applyGradient(selector: string | HTMLElement, attr: 'fill' | 'stroke', gradient: GradientOptions): void;

        can(feature: string): boolean;

        contextmenu(evt: Event, x: number, y: number): void;

        findBySelector(selector: string): JQuery;

        findMagnet(el: SVGElement | JQuery): undefined | JQuery;

        getEventNamespace(): string;

        getSelector(el: HTMLElement, prevSelector: string): string;

        getStrokeBBox(el?: Vectorizer | string | SVGElement): g.Rect;

        mouseenter(evt: Event): void;

        mouseleave(evt: Event): void;

        mouseout(evt: Event): void;

        mouseover(evt: Event): void;

        mousewheel(evt: Event, x: number, y: number, delta: number): void

        notify(eventName: string, ...notifyArgs: any[]): void;

        onChangeAttrs(cell: Cell, attrs: Backbone.ViewOptions<T>, options?: {dirty?: boolean}): this;

        onSetTheme(oldTheme: string, newTheme: string): void;

        onRemove(): void;

        onRender(): void;

        pointerclick(evt: Event, x: number, y: number): void;

        pointerdblclick(evt: Event, x: number, y: number): void;

        pointerdown(evt: Event, x: number, y: number): void;

        pointermove(evt: Event, x: number, y: number): void;

        pointerup(evt: Event, x: number, y: number): void;

        remove(): this;

        removeThemeClassName(theme?: string): this;

        setInteractivity(value: any): void;

        setTheme(theme: string, options?: {override?: boolean}): this;
    }

    class CellView extends CellViewGeneric<Cell> {
    }

    interface ElementViewAttributes {
        style?: string;
        text?: string;
        html?: string;
        "ref-x"?: string | number;
        "ref-y"?: string | number;
        "ref-dx"?: number;
        "ref-dy"?: number;
        "ref-width"?: string | number;
        "ref-height"?: string | number;
        ref?: string;
        "x-alignment"?: 'middle' | 'right' | number;
        "y-alignment"?: 'middle' | 'bottom' | number;
        port?: string;
    }
    class ElementView extends CellViewGeneric<Element> {
        scale(sx: number, sy: number): void; // @todo Documented in source but not released
        finalizeEmbedding(options?: {model?: Backbone.Model, paper?: Paper}): void;

        getBBox(options?: {useModelGeometry?: boolean}): g.Rect;

        mouseenter(evt: Event): void;

        mouseleave(evt: Event): void;

        pointerdown(evt: Event, x: number, y: number): void;

        pointermove(evt: Event, x: number, y: number): void;

        pointerup(evt: Event, x: number, y: number): void;

        positionRelative(vel: any, bbox: BBox, attributes: ElementViewAttributes, nodesBySelector?: Object): void; // Vectorizer

        prepareEmbedding(options?: {model?: Backbone.Model, paper?: Paper}): void;

        processEmbedding(options?: {model?: Backbone.Model, paper?: Paper}): void;

        renderMarkup(): void;

        resize(): void;
        // cell and changed are not used in the method, but opt is.
        resize(cell: any, changed: any, opt: object): void;

        rotate(): void;

        translate(): void;
        // none of these args are used in the function body.
        translate(model: Backbone.Model, changes?: any, options?: any): void;

        update(cell: Cell, renderingOnlyAttrs?: object): void;

        applyPortTransform(element: Vectorizer,
                           transformData: {dx: number, dy: number, angle: number,
                                           attrs: object, x: number, y: number}, initialAngle: number): void;
    }

    class LinkView extends CellViewGeneric<Link> {
        options: {
            shortLinkLength?: number,
            doubleLinkTools?: boolean,
            longLinkLength?: number,
            linkToolsOffset?: number,
            doubleLinkToolsOffset?: number,
            sampleInterval: number
        };

        getConnectionLength(): number;

        sendToken(token: SVGElement, duration?: number, callback?: () => void): void;

        addVertex(vertex: Point): number;

        getPointAtLength(length: number): g.Point; // Marked as public api in source but not in the documents
        createWatcher(endType: { id: string }): (link: Link, end?: {id: string}) => this;

        findRoute(oldVertices: Point[]): Point[];

        getConnectionPoint(end: 'source' | 'target', selectorOrPoint: Element | Point, referenceSelectorOrPoint: Element
                               | Point): g.Point;

        getPathData(vertices: Point[]): string;

        mouseenter(evt: Event): void;

        mouseleave(evt: Event): void;

        onEndModelChange(endType: 'source' | 'target', endModel?: Element,
                         opt?: {cacheOnly?: boolean, handleBy?: string, translateBy?: boolean, tx?: number, ty?: number}): void;

        onLabelsChange(): void;

        onSourceChange(cell: Cell, sourceEnd: { id: string }, options: object): void;

        onTargetChange(cell: Cell, targetEnd: { id: string }, options: object): void;

        onToolsChange(): void;

        // changed is not used in function body.
        onVerticesChange(cell: Cell, changed: any, options: object): void;

        pointerdown(evt: Event, x: number, y: number): void;

        pointermove(evt: Event, x: number, y: number): void;

        pointerup(evt: Event, x: number, y: number): void;

        removeVertex(idx: number): this;

        renderArrowheadMarkers(): this;

        renderLabels(): this;

        renderTools(): this;

        renderVertexMarkers(): this;

        startArrowheadMove(end: 'source' | 'target', options?: { whenNotAllowed: 'remove' | 'revert' }): void;

        startListening(): void;

        update(model: Cell, attributes: object, options?: object): this;

        updateArrowheadMarkers(): this;

        updateAttributes(): void;

        updateConnection(options?: {translateBy?: any, tx?: number, ty?: number}): void;

        updateLabelPositions(): this;

        updateToolsPosition(): this;
    }
}

export namespace ui {
}

export namespace shapes {
    interface GenericAttributes<T> extends dia.CellAttributes {
        position?: dia.Point;
        size?: dia.Size;
        angle?: number;
        attrs?: T;
    }
    interface ShapeAttrs extends dia.CSSSelector {
        fill?: string;
        stroke?: string;
        r?: string | number;
        rx?: string | number;
        ry?: string | number;
        cx?: string | number;
        cy?: string | number;
        height?: string | number;
        width?: string | number;
        transform?: string;
        points?: string;
        'stroke-width'?: string | number;
        'ref-x'?: string | number;
        'ref-y'?: string | number;
        ref?: string
    }

    namespace basic {
        class Generic extends dia.Element {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        interface RectAttrs extends dia.TextAttrs {
            rect?: ShapeAttrs;
        }
        class Rect extends Generic {
            constructor(attributes?: GenericAttributes<RectAttrs>, options?: Object);
        }
        class Text extends Generic {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: Object);
        }
        interface CircleAttrs extends dia.TextAttrs {
            circle?: ShapeAttrs;
        }
        class Circle extends Generic {
            constructor(attributes?: GenericAttributes<CircleAttrs>, options?: Object);
        }
        interface EllipseAttrs extends dia.TextAttrs {
            ellipse?: ShapeAttrs;
        }
        class Ellipse extends Generic {
            constructor(attributes?: GenericAttributes<EllipseAttrs>, options?: Object);
        }
        interface PolygonAttrs extends dia.TextAttrs {
            polygon?: ShapeAttrs;
        }
        class Polygon extends Generic {
            constructor(attributes?: GenericAttributes<PolygonAttrs>, options?: Object);
        }
        interface PolylineAttrs extends dia.TextAttrs {
            polyline?: ShapeAttrs;
        }
        class Polyline extends Generic {
            constructor(attributes?: GenericAttributes<PolylineAttrs>, options?: Object);
        }
        class Image extends Generic {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: Object);
        }
        interface PathAttrs extends dia.TextAttrs {
            path?: ShapeAttrs;
        }
        class Path extends Generic {
            constructor(attributes?: GenericAttributes<PathAttrs>, options?: Object);
        }
        interface RhombusAttrs extends dia.TextAttrs {
            path?: ShapeAttrs;
        }
        class Rhombus extends Generic {
            constructor(attributes?: GenericAttributes<RhombusAttrs>, options?: Object);
        }
        interface TextBlockAttrs extends dia.TextAttrs {
            rect?: ShapeAttrs;
        }
        class TextBlock extends Generic {
            constructor(attributes?: GenericAttributes<TextBlockAttrs>, options?: Object);

            updateSize(cell: dia.Cell, size: dia.Size): void;

            updateContent(cell: dia.Cell, content: string): void;
        }
    }

    namespace chess {
        class KingWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class KingBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class QueenWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class QueenBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class RookWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class RookBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class BishopWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class BishopBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class KnightWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class KnightBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class PawnWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class PawnBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
    }

    namespace devs {
        interface ModelAttributes extends GenericAttributes<dia.SVGAttributes> {
            inPorts?: string[];
            outPorts?: string[];
            ports?: Object;
        }
        class Model extends basic.Generic {
            constructor(attributes?: ModelAttributes, options?: Object);

            changeInGroup(properties: any, opt?: any): boolean;

            changeOutGroup(properties: any, opt?: any): boolean;

            createPortItem(group: string, port: string): any;

            createPortItems(group: string, ports: string[]): any[];

            addOutPort(port: string, opt?: any): this;

            addInPort(port: string, opt?: any): this;

            removeOutPort(port: string, opt?: any): this;

            removeInPort(port: string, opt?: any): this;
        }
        class Coupled extends Model {
            constructor(attributes?: ModelAttributes, options?: Object);
        }
        class Atomic extends Model {
            constructor(attributes?: ModelAttributes, options?: Object);
        }
        class Link extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
    }

    namespace erd {
        class Entity extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: Object);
        }
        class WeakEntity extends Entity {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: Object);
        }
        class Relationship extends dia.Element {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: Object);
        }
        class IdentifyingRelationship extends Relationship {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: Object);
        }
        interface AttributeAttrs extends dia.TextAttrs {
            ellipse?: ShapeAttrs;
        }
        class Attribute extends dia.Element {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: Object);
        }
        class Multivalued extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: Object);
        }
        class Derived extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: Object);
        }
        class Key extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: Object);
        }
        class Normal extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: Object);
        }
        interface ISAAttrs extends dia.Element {
            polygon?: ShapeAttrs;
        }
        class ISA extends dia.Element {
            constructor(attributes?: GenericAttributes<ISAAttrs>, options?: Object);
        }
        class Line extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);

            cardinality(value: string | number): void;
        }
    }

    namespace fsa {
        class State extends basic.Circle {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: Object);
        }
        class StartState extends dia.Element {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: Object);
        }
        class EndState extends dia.Element {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class Arrow extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
    }

    namespace logic {
        interface LogicAttrs extends ShapeAttrs {
            ref?: string;
            'ref-x'?: number | string;
            'ref-dx'?: number | string;
            'ref-y'?: number | string;
            'ref-dy'?: number | string;
            magnet?: boolean;
            'class'?: string;
            port?: string;
        }
        interface IOAttrs extends dia.TextAttrs {
            circle?: LogicAttrs;
        }
        class Gate extends basic.Generic {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: Object);
        }
        class IO extends Gate {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: Object);
        }
        class Input extends IO {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: Object);
        }
        class Output extends IO {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: Object);
        }
        class Gate11 extends Gate {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: Object);
        }
        class Gate21 extends Gate {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: Object);
        }
        interface Image {
            'xlink:href'?: string;
        }
        interface ImageAttrs extends LogicAttrs {
            image?: Image;
        }
        class Repeater extends Gate11 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input: any): any;
        }
        class Note extends Gate11 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input: any): boolean;
        }
        class Or extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input1: any, input2: any): boolean;
        }
        class And extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input1: any, input2: any): boolean;
        }
        class Nor extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input1: any, input2: any): boolean;
        }
        class Nand extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input1: any, input2: any): boolean;
        }
        class Xor extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input1: any, input2: any): boolean;
        }
        class Xnor extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: Object);

            operation(input1: any, input2: any): boolean;
        }
        interface WireArgs extends dia.LinkAttributes {
            router?: Object;
            connector?: Object;
        }
        class Wire extends dia.Link {
            constructor(attributes?: WireArgs, options?: Object);
        }
    }

    namespace org {
        interface MemberAttrs {
            rect?: ShapeAttrs;
            image?: ShapeAttrs;
        }
        class Member extends dia.Element {
            constructor(attributes?: GenericAttributes<MemberAttrs>, options?: Object);
        }
        class Arrow extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
    }

    namespace pn {
        class Place extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class PlaceView extends dia.ElementView {
            renderTokens(): void;
        }
        class Transition extends basic.Generic {
            constructor(attributes?: GenericAttributes<basic.RectAttrs>, options?: Object);
        }
        class Link extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
    }

    namespace uml {
        interface ClassAttributes extends GenericAttributes<basic.RectAttrs> {
            name: string[];
            attributes: string[];
            methods: string[];
        }
        class Class extends basic.Generic {
            constructor(attributes?: ClassAttributes, options?: Object);

            getClassName(): string[];

            updateRectangles(): void;
        }
        class ClassView extends dia.ElementView {
        }
        class Abstract extends Class {
            constructor(attributes?: ClassAttributes, options?: Object);
        }
        class AbstractView extends ClassView {
            constructor(attributes?: ClassAttributes, options?: Object);
        }
        class Interface extends Class {
            constructor(attributes?: ClassAttributes, options?: Object);
        }
        class InterfaceView extends ClassView {
            constructor(attributes?: ClassAttributes, options?: Object);
        }
        class Generalization extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
        class Implementation extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
        class Aggregation extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
        class Composition extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
        class Association extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
        interface StateAttributes extends GenericAttributes<ShapeAttrs> {
            events?: string[];
        }
        class State extends basic.Generic {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: Object);

            updateName(): void;

            updateEvents(): void;

            updatePath(): void;
        }
        class StartState extends basic.Circle {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: Object);
        }
        class EndState extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: Object);
        }
        class Transition extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: Object);
        }
    }
}

export namespace util {

    namespace format {
        export function number(specifier: string, value: number): string;
    }

    export function uuid(): string;

    export function guid(obj?: Object): string;

    export function nextFrame(callback: () => void, context?: Object): number;

    export function cancelFrame(requestId: number): void;

    export function flattenObject(object: Object, delim: string, stop: (node: any) => boolean): any;

    export function getByPath(object: Object, path: string, delim: string): any;

    export function setByPath(object: Object, path: string, value: Object, delim: string): any;

    export function unsetByPath(object: Object, path: string, delim: string): any;

    export function breakText(text: string, size: dia.Size, attrs?: dia.SVGAttributes, options?: { svgDocument?: SVGElement }): string;

    export function normalizeSides(box: number | { x?: number, y?: number, height?: number, width?: number }): dia.BBox;

    export function getElementBBox(el: Element): dia.BBox;

    export function setAttributesBySelector(el: Element, attrs: dia.SVGAttributes): void;

    export function sortElements(elements: Element[]
                                     | string
                                     | JQuery, comparator: (a: Element, b: Element) => number): Element[];

    export function shapePerimeterConnectionPoint(linkView: dia.LinkView, view: dia.ElementView, magnet: SVGElement, ref: dia.Point): dia.Point;

    export function imageToDataUri(url: string, callback: (err: Error, dataUri: string) => void): void;

    export function toggleFullScreen(el?: Element): void;

    // Not documented but used in examples
    /** @deprecated use lodash _.defaultsDeep */
    export function deepSupplement(objects: any, defaultIndicator?: any): any;

    // Private functions
    /** @deprecated use lodash _.assign */
    export function mixin(objects: any[]): any;

    /** @deprecated use lodash _.defaults */
    export function supplement(objects: any[]): any;

    /** @deprecated use lodash _.mixin  */
    export function deepMixin(objects: any[]): any;
}

export namespace layout {

    interface LayoutOptions {
        nodeSep?: number;
        edgeSep?: number;
        rankSep?: number;
        rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
        marginX?: number;
        marginY?: number;
        resizeCluster?: boolean;
        setPosition?: (element: dia.Element, position: dia.BBox) => void;
        setLinkVertices?: (link: dia.Link, vertices: Position[]) => void;
    }

    export namespace DirectedGraph {
        export function layout(graph: dia.Graph | dia.Cell[], options?: LayoutOptions): dia.BBox;
    }
}

export namespace mvc {

    class View extends Backbone.View<Backbone.Model> {

        protected init(): void;

        render(): this;

        protected onRender(): void;

        protected onSetTheme(oldTheme: string, newTheme: string): void;

        protected getEventNamespace(): string;
    }
}

export namespace ui {

    class Clipboard extends Backbone.Collection<Backbone.Model> {
        constructor(options?: { useLocalStorage: boolean });

        /**
         * This function returns the elements and links from the original graph that were copied. This is useful for implements
         * the Cut operation where the original cells should be removed from the graph. `selection` contains
         * elements that should be copied to the clipboard. Note that with these elements, also all the associated
         * links are copied. That's why we also need the `graph` parameter, to find these links.
         */
        copyElements(selection: Backbone.Collection<dia.Cell>, graph: dia.Graph, opt?: object): Array<dia.Cell>;

        /**
         * Same logic as per `copyElements`, but elements are removed from the graph
         */
        cutElements(selection: Backbone.Collection<dia.Cell>, graph: dia.Graph, opt?: object): Array<dia.Cell>;

        /**
         * If `translate` object with `dx` and `dy` properties is passed, the copied elements will be
         * translated by the specified amount. This is useful for e.g. the 'cut' operation where we'd like to have
         * the pasted elements moved by an offset to see they were pasted to the paper.
         *
         * If `useLocalStorage` is `true`, the copied elements will be saved to the localStorage (if present)
         * making it possible to copy-paste elements between browser tabs or sessions.
         *
         * `link` is attributes that will be set all links before they are added to the `graph`.
         * This is useful for e.g. setting `z: -1` for links in order to always put them to the bottom of the paper.
         */
        pasteCells(graph: dia.Graph, opt?: object): Array<dia.Cell>;

        clear(): void;

        private modifyCell(cell: dia.Cell, opt?: object): dia.Cell

    }

    class SelectBox extends mvc.View {
        constructor(options?: SelectBox.Option);

        private renderOptions(): void;

        protected onOptionHover(option: object, idx: string)

        protected position(): void;

        private respectWindowBoundaries(): void;

        private alignOptionsArrow(): void;

        protected calculateElOverflow(el: HTMLElement, target: any): number;

        onOptionsMouseOut(evt: object): void;

        onOptionSelect(idx, opt): void;

        removeOptions(): void;

        renderSelection(option?: SelectBox.Option): void;

        onToggle(evt: Event): void;

        onOutsideClick(evt: Event): void;

        getSelection(): string;

        getSelectionValue(selection: any): any

        getSelectionIndex(): number;

        select(idx: string, opt?: object): void;

        selectByValue(value: any, opt?: object): void;

        isOpen(): boolean;

        toggle(): void;

        open(): void;

        close(): void;

        isDisabled(): boolean;

        enable(): void;

        disable(): void;

        static OptionsView: any
    }

    namespace SelectBox {
        export interface Option {
            icon: string;
            content: any;
        }
    }

    class ColorPalette extends ui.SelectBox {

        protected position(): void;

        static OptionsView: any;
    }

    class ContextToolbar extends mvc.View {
        constructor(options?: { padding?: number, autoClose?: boolean })

        protected onToolPointerdown(evt: Event): void ;

        protected onDocumentMousedown(evt: Event): void;

        protected renderContent(): void;

        private getRoot(): HTMLElement;

        position(): void;

        bind(): void;

        unbind(): void;

        static opened: boolean;

        static close(): void;

        // Call whenever the `options.target` changes its position.
        static update(): void;
    }

    class Dialog extends mvc.View {

        constructor(options?: {
                        draggable: false,
                        closeButtonContent: '&times;',
                        closeButton: true,
                        inlined: false,
                        modal: true
                    });

        close(): this;

        protected action(evt: Event): void;

        protected onDragStart(evt): void;

        protected onDrag(evt): void;

        protected  onDragEnd(): void;
    }

    class FlashMessage extends ui.Dialog {

        constructor(options?: {
                        closeButton?: true,
                        modal?: false,
                        cascade?: true,
                        closeAnimation?: {
                            delay?: 2000,
                            duration?: 200,
                            easing?: 'swing',
                            properties?: {
                                opacity?: 0
                            }
                        },
                        openAnimation?: {
                            duration?: 200,
                            easing?: 'swing',
                            properties?: {
                                opacity?: 1
                            }
                        }
                    })

        protected addToCascade(): void;

        protected removeFromCascade(): void;

        protected startCloseAnimation(): void;

        protected startOpenAnimation(): void;

        static padding: 15;

        static open(content: any, title: any, opt?: object);

        static close(): void;

        open(): this;

        close(): this;
    }

    namespace FreeTransform {
        export interface Options {
            cellView?: dia.CellView;
            rotateAngleGrid?: number;
            preserveAspectRatio?: boolean;
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
            allowOrthogonalResize?: boolean;
            allowRotation?: boolean;
            clearAll?: boolean;
            clearOnBlankPointerdown?: boolean;
        }
    }

    class FreeTransform extends mvc.View {

        constructor(options?: FreeTransform.Options);

        protected renderHandles(): void;

        update(): void;

        calculateTrueDirection(relativeDirection: any): any;

        protected startResizing(evt: Event): void;

        protected  toValidResizeDirection(direction: string): any

        protected startRotating(evt: Event): void;

        protected  pointermove(evt: Event): void;

        protected pointerup(evt: Event): void;

        startOp(el: HTMLElement): void;

        stopOp(): void

        static instancesByPaper: object;

        // Removes all freetransforms from the paper.
        static clear(paper): void;

        static removeInstancesForPaper(paper): void;

        static getInstancesForPaper(paper): void;

        static registerInstanceToPaper(instance, paper): void;

        static unregisterInstanceFromPaper(instance, paper): void;
    }

    class Inspector extends mvc.View {
        constructor(options: {
                        cellView: undefined,    // One can pass either a cell view ...
                        cell: undefined,        // ... or the cell itself.
                        live: true,      // By default, we enabled live changes from the inspector inputs.
                        validateInput: (input, path, type) => boolean;
                    });

        // Custom operators can be defined here as `function(cell, value, argument*): void; return boolean; }`
        // e.g. { longerThan: function (cell, value, prop): void; return value.length > cell.prop(prop); }}
        operators: {};
        multiOpenGroups: true;   // `true` if the Inspector is supposed to allow multiple open groups at the same time. Set to `false` for classical accordion.

        /**
         * Used for logic of store/restore currently opened/stored groups.
         * @params {joint.dia.Cell} model
         * @returns {string}
         * */
        stateKey: (model: any) => any;

        protected onChangeInput(evt: Event): void;

        protected processInput($input: JQuery, opt?: object): void;

        protected onCellChange(eventName, cell, change, opt): void;

        protected pointerdown(evt: Event): void;

        protected pointerup(): void;

        protected  pointerfocusin(evt: Event): void;

        protected  pointerfocusout(evt: Event): void;

        protected  onGroupLabelClick(evt: Event): void;

        protected renderFieldContent(options: object, path: string, value: any): HTMLElement;

        protected onContentEditableBlur(evt: Event): void;


        getModel(): dia.Cell;

        getAttributeKeysInUse(): any;

        // Get the value of the attribute at `path` based on the `options.defaultValue`,
        // and `options.valueRegExp` if present.
        getCellAttributeValue(path: string, options?: object): any;

        resolveBindings(options?: object): any;

        updateBindings(path: string): void;

        renderGroup(opt?: object): JQuery;

        renderOwnFieldContent(opt?: object): Array<JQuery>;

        replaceHTMLEntity(entity: any, code: any): void;

        renderObjectProperty(opt?: object): JQuery;

        renderListItem(opt?: object): JQuery;

        renderFieldContainer(opt?: object): JQuery;

        renderTemplate($el: JQuery, options: object, path: string, opt?: object): void;

        updateInputPosition(): void;

        updateInputSize(): void;

        updateInputAngle(): void;

        validateInput(type, input, path): boolean;

        // unset a model property
        unsetProperty(path: string, opt?: object): void;

        getOptions($attribute: JQuery): any;

        updateCell($attr: JQuery, attrPath: string, opt?: object): void;

        // Find the first list on the given path (exclude the list determined by the path itself).
        findParentListByPath(path: string): string;

        getFieldValue(attribute: any, type: any): any;

        setProperty(path: string, value: any, opt?: object): void;

        // Parse the input `value` based on the input `type`.
        // Override this method if you need your own specific parsing.
        parse(type: string, value: any, targetElement: HTMLElement): any;

        startBatchCommand(): void;

        stopBatchCommand(): void;

        addListItem(evt: Event): void;

        deleteListItem(evt: Event): void;

        removeWidgets(): void;

        toggleGroup(name: string): void;

        closeGroup(name: string, opt): void;

        openGroup(name: string, opt): void;

        closeGroups(): void;

        openGroups(): void;

        // Expressions
        // COMPOSITE_OPERATORS: ['not', 'and', 'or', 'nor'],
        // PRIMITIVE_OPERATORS: ['eq', 'ne', 'regex', 'text', 'lt', 'lte', 'gt', 'gte', 'in', 'nin', 'equal'],

        isExpressionValid(expr: string): boolean;

        extractExpressionPaths(expr: string): any;

        /**
         * store the current state of groups.
         */
        storeGroupsState(): string;

        /**
         * get groups which are actually stored as closed in state. This could differ from currently rendered state.
         */
        getGroupsState(): Array<string>;

        /**
         * Opens/closes groups regards to the stored state.
         */
        restoreGroupsState(): any;

        /** @type {Object.<string, Array.<string>>} */
        static groupStates: {};

        /** @type joint.ui.Inspector */
        static instance: null;

        static  create(container: Element | string | JQuery, opt?: object): ui.Inspector;

        static  close(): void;
    }

    class PaperScroller extends mvc.View {
        constructor(options?: object)

        protected onBackgroundEvent(evt: Event): void;

        protected  onResize(): void;

        protected  onScale(sx, sy, ox, oy): void;

        protected  beforePaperManipulation(): void;

        protected  afterPaperManipulation(): void;

        lock(): this;

        unlock(): this;

        setCursor(cursor): this;

        storeScrollPosition(): void;

        restoreScrollPosition(): void;

        clientToLocalPoint(x, y): g.Point;

        localToBackgroundPoint(x, y): g.Point;

        adjustPaper(): this;

        adjustScale(sx: number, sy: number): void;

        // Recalculates content options taking the current scale into account.
        transformContentOptions(opt?: object): object;

        // Adjust the paper position so the point [x,y] is moved to the center of paperScroller element.
        // If no point given [x,y] equals to center of the paper element.
        center(x?: number, y?: number, opts?: object): this;

        centerContent(opts?: number): this;

        centerElement(element: HTMLElement): this;

        // less aggresive then center as it only changes position of scrollbars
        // without adding paddings - it wont actually move view onto the position
        // if there isn't enough room for it!
        // optionally you can specify `animation` key in option argument
        // to make the scroll animated; object is passed into $.animate
        scroll(x: number, y: number, opt?: object): void;

        // simple wrapper around scroll method that finds center of specified
        // element and scrolls to it
        // it's possible to pass in opts object that is used in scroll() method (eg. animation)
        scrollToElement(element: HTMLElement, opts?: object): void;

        // Position the paper inside the paper wrapper and resize the wrapper.
        addPadding(left: number, right: number, top: number, bottom: number): this;

        zoom(value: number, opt?: object): this;

        zoomToFit(opt?: object): this;

        transitionClassName: 'transition-in-progress';

        transitionEventName: 'transitionend.paper-scroller-transition';

        transitionToPoint(x: number, y: number, oopt?: object): this;

        removeTransition(): this;

        transitionToRect(rect: g.Rect, opt?: object): g.Point;

        startPanning(evt: Event): void;

        pan(evt: Event): void;

        stopPanning(evt: Event): void;

        getPadding(): dia.BBox;

        getVisibleArea(): g.Rect;

        isElementVisible(element: HTMLElement, opt?: object): boolean;

        isPointVisible(point: g.Point): boolean;

        // some method require element only because link is missing some tools (eg. bbox)
        checkElement(element: HTMLElement, methodName: string): void;
    }

    namespace Lightbox {
        export type Easing = string;
        export interface Options {
            closeButton?: boolean;
            modal?: boolean;
            closeAnimation?: {
                delay?: number;
                duration?: number;
                easing?: Easing;
                properties?: {
                    opacity?: number
                }
            };
            title?: string;
            image: string;
            top?: number;
            windowArea?: number;
            openAnimation?: boolean
        }
    }

    class Lightbox extends ui.Dialog {
        constructor(options?: Lightbox.Options)

        open(): this;

        positionAndScale(): void;

        close(): this;

        startCloseAnimation(): void;

        startOpenAnimation(): void;
    }

    class Popup extends ContextToolbar {

        renderContent(): void;
    }

    class PathEditor extends mvc.View {
        constructor(options: object);

        tagName: 'g';

        svgElement: true;

        protected createAnchorPoint(evt: Event): void;

        protected removeAnchorPoint(evt: Event): void;

        protected lockControlPoint(evt: Event): void;

        clear(): void;

        startMoving(evt: Event): this;

        move(evt: Event): this;

        adjustControlPoint(index: number, attrIndex, dx, dy): void;

        adjustAnchorPoint(index: number, dx, dy): void;

        updateDirectionPaths(index: number): void;

        updateSegmentPath(index: number): void;

        stopMoving(evt: Event): void;
    }

    namespace Navigator {

        export interface Options {
            paperConstructor?: dia.Paper;
            paperOptions?: any;
            paperScroller?: PaperScroller;
            zoomOptions?: null;
            zoom?: { min?: number, max?: number };
            width?: number;
            height?: number;
            padding?: number;
        }
    }

    class Navigator extends mvc.View {

        constructor(options?: Navigator.Options)

        protected doAction(evt: Event): void;

        // Updates the navigator's paper size and transformations
        updatePaper(width: number, height: number): void;

        // Updates the position and size of the navigator's current view rectangle.
        updateCurrentView(): void;

        startAction(evt: Event): void;

        stopAction(): void;

        // Scrolls the view to the position determined by the event.
        scrollTo(evt: Event): void;
    }

    namespace SelectButtonGroup {
        export class Options {
            buttonWidth?: undefined;
            buttonHeight?: undefined;
            options?: Array<any>;
            disabled?: false;
            multi?: false;   // Are multiple selections allowed?
            selected?: undefined;  // selected value can either be defined directly in the options array or here as an index to it.
        }
    }

    class SelectButtonGroup extends mvc.View {

        constructor(options?: SelectButtonGroup.Options);

        protected onSelect(evt: Event): void;

        protected onOptionHover(evt: Event): void;

        protected  onMouseOut(evt: Event): void;

        protected  pointerdown(evt: Event): void;

        protected  pointerup(): void;

        renderOptions(): void;

        removeOptions(): void;

        renderOption(option: object, idx: string, isSelected: boolean): any;

        renderOptionContent(option: object, isSelected: boolean): JQuery;

        getOptionIndex(el): string;

        getSelection(): void;

        getSelectionValue(selection: any): any;

        select(index: number, opt?: object): void;

        selectByValue(value: any, opt?: object): void;

        deselect(): void;

        isDisabled(): boolean;

        enable(): void;

        disable(): void;
    }

    class Widget {

    }

    namespace Toolbar {
        export interface Options {
            tools: [{ group: 'groupName' }],
            groups: {
                name: {
                    index: number,
                    align: 'left' | 'right'
                }

            }
            references: any
        }
    }

    class Toolbar extends mvc.View {

        constructor(options: Toolbar.Options);

        on(evt: string | object, callback?: (evt: Event) => void, context?: object): this;

        getWidgetByName(name: string): Array<ui.Widget>;

        getWidgets(): Array<ui.Widget>;
    }

    class Tooltip extends mvc.View {

        constructor(options?: Tooltip.Options);

        protected getTooltipSettings(el: HTMLElement): object;

        hide(): void;

        show(evt?: Event): void;

        toggle(evt?: Event): void;

        isVisible(): boolean;
    }

    namespace Tooltip {

        export enum TooltipPosition {
            Left,
            Top,
            Bottom,
            Right
        }

        export type TooltipArrowPosition = 'auto' | 'left' | 'top' | 'bottom' | 'right' | 'off';

        export interface Options {

            position?: TooltipPosition | ((element: Element) => TooltipPosition);
            positionSelector?: string | ((element: Element) => Element);
            direction?: TooltipArrowPosition;
            minResizedWidth?: number;
            padding?: number;
            rootTarget?: any;
            target?: any;
            trigger?: string;
            viewport?: {
                selector?: null
                padding?: number
            };
            dataAttributePrefix?: string;
            template?: string;
        }
    }

    class Keyboard {
        constructor();

        on(evt: string | object, callback: ((evt: Event) => void) | any, context?: any): this;

        off(evt: string | object, callback: ((evt: Event) => void) | any, context?: any): this;

        enable(): void;

        disable(): void;

        isActive(name: string, evt: KeyboardEvent): boolean;
    }

    class Selection extends mvc.View {

        constructor(options?: object);

        protected onSelectionBoxPointerDown(evt: Event): void;

        protected startTranslatingSelection(evt: Event): void;

        protected pointerup(evt: Event): void;

        protected destroySelectioaBox(elememet: dia.Element): void;

        protected showSelected(): void;

        protected destroyAllSelectionBoxes(): void;

        protected createSelectionBox(element: Element): void;

        protected onHandlePointerDown(evt: Event): void;

        protected pointermove(evt: Event): void;

        protected onRemoveElement(element: dia.Element): void;

        protected onResetElements(elements: dia.Element): void;

        protected onAddElement(element): void;

        cancelSelection(): void;

        addHandle(opt?: object): this;

        stopSelecting(evt: Event): void;

        removeHandle(name: string): this;

        startSelecting(evt: Event): void;

        changeHandle(name: string, opt?: object): this;

        translateSelectedElements(dx: number, dy: number): void;

        hide(): void;
    }

    // alias
    class SelectionView extends Selection {

    }

    class Snaplines extends mvc.View {
        constructor(options?: object);

        startListening(): void;

        protected onBatchStop(data): void;

        captureCursorOffset(cellView, evt, x, y): void;

        snapWhileResizing(cell, opt): void;

        canElementMove(cellView): boolean;

        snapWhileMoving(cellView, evt, x, y): void;

        show(opt): void;

        hide(): void;
    }

    class Stencil extends mvc.View {
        constructor(options?: object);

        options: any;

        setPaper(paper: dia.Paper): void;

        startListening(): void;

        load(cells: Array<dia.Element>, group?: object): void;

        /**
         * @public
         * Populate stencil with `cells`. If `group` is passed, only the graph in the named group
         * will be populated
         * @param {Array.<joint.dia.Element>} cells
         * @param {string=} group Mandatory in 'group' mode  - 'options.groups' property is defined
         */
        loadGroup(cells: Array<dia.Element>, group: object): void;

        getGraph(group: string): dia.Graph;

        getPaper(group: string): dia.Paper;

        preparePaperForDragging(cellView: dia.CellView, clientX: number, clientY: number): void;

        setPaperDragOffset(clientX: number, clientY: number): number;

        setCloneLocalPosition(clientX: number, clientY: number): number;

        protected onDragStart(cellView: dia.CellView, evt: Event): void;

        protected onCloneSnapped(clone, position, opt): void;

        protected  onDrag(evt: Event): void;

        protected  onDragEnd(evt: Event): void;

        protected  onDropEnd(cellClone: dia.Cell): void;

        protected  onDropInvalid(evt: Event, cellClone: dia.Cell): void;

        protected onSearch(evt: Event): void;

        protected  pointerFocusIn(): void;

        protected  pointerFocusOut(): void;

        protected  onGroupLabelClick(evt: Event): void;

        toggleGroup(name): void;

        closeGroup(name): void;

        openGroup(name): void;

        isGroupOpen(name): boolean;

        closeGroups(): void;

        openGroups(): void;
    }

    class TreeLayoutView extends mvc.View {

        constructor(options?: object);

        startListening(): void;

        toggleDefaultInteraction(interactive): void;

        toggleDropping(state): void;

        canDrop(): boolean;

        isActive(): boolean;

        // Interaction
        canInteract(handler): boolean;

        startDragging(elements: Array<dia.Element>): void;

        protected   onPointerdown(elementView: dia.ElementView): void;

        protected onPointermove(evt: Event): void;

        protected   onPointerup(evt: Event): void;
    }

    namespace Halo {
        export interface Options {
            cellView: dia.CellView;
            handles?: Array<HaloHandle>;
            clearAll?: boolean;
            clearOnBlankPointerdown?: boolean;
            useModelGeometry?: boolean;
            clone?: (cell: dia.Cell, opt?: object) => dia.Cell;
            type?: string;
            pieSliceAngle?: number;
            pieStartAngleOffset?: number;
            pieIconSize?: number;
            pieToggles?: [{ name: 'default'; position: 'e' }];
        }

        enum HaloHandlePosition {
            N, NW,
            W, SW,
            S, SE,
            E, NE
        }

        interface HaloHandleEvents {
            pointerdown: string | ((evt: Event) => void);
            pointermove: string | ((evt: Event) => void);
            pointerup: string | ((evt: Event) => void);
        }

        interface HaloHandle {
            name: string,
            position: HaloHandlePosition,
            events: HaloHandleEvents
            attrs: any
        }
    }

    class Halo extends mvc.View {
        constructor(options?: Halo.Options);

        protected update(): void;

        protected onHandlePointerDown(evt: Event): void;

        protected onPieTogglePointerDown(evt: Event): void;

        protected pointermove(evt: Event): void;

        protected pointerup(evt: Event): void;

        extendHandles(props: object): void;

        addHandles(handles: Array<object>): this;

        addHandle(opt?: object): this;

        removeHandles(): this;

        removeHandle(name: string): this;

        changeHandle(name: string, opt?: object): this;

        hasHandle(name: string): boolean;

        getHandle(name: string): object

        toggleHandle(name: string, selected): this;

        selectHandle(name: string): this;

        deselectHandle(name: string): this;

        deselectAllHandles(): this;

        toggleState(toggleName: string): void;

        isOpen(toggleName: string): boolean;

        isRendered(): boolean;

        static clear(paper: dia.Paper): void;
    }
}

export namespace dia {
    const CommandManager: any;
    const Validator: any;
}

export namespace alg {
    const PriorityQueue: any;
    const Dijkstra: any;
}

export namespace com {
    const Channel: any;
    const ChannelHub: any;
}

export namespace format {
    const gexf: any;
}

export namespace layout {
    const ForceDirected: any;
    const GridLayout: any;
    const Remote: any;
    const TreeLayout: any;
}

export namespace storage {
    const Local: any;
}
