---
title: Mermaid Diagram Types
---

# Mermaid Diagram Types Reference

**File**: `MERMAID_DIAGRAM_TYPES.json`

Complete reference documentation for all MermaidJS diagram types, their syntax organization, and narrative generation support status.

## Overview

MermaidJS supports **23 diagram types** across 5 categories:

- **Logic & Process** (3): Flowchart, State Diagram, Mind Map
- **Interaction & Time** (4): Sequence, User Journey, Gantt, Timeline
- **Data Structure** (4): Class, Entity Relationship, C4, Architecture
- **Data Visualization** (6): Pie, Quadrant, Radar, XY Chart, Sankey, Treemap
- **Domain-Specific** (6): Git Graph, Requirement, Packet, Kanban, ZenUML, Block

## Diagram Types Quick Reference

### Currently Supported Narrative Generation ✅

| Type | Generator | Key Output |
|------|-----------|-----------|
| **Flowchart** | `generateFlowchartNarrative()` | Nodes, edges, decisions, connections |
| **Pie Chart** | `generatePieNarrative()` | Data breakdown, percentages, total |
| **Class Diagram** | `generateClassDiagramNarrative()` | Classes, methods, relationships |
| **Gantt Chart** | `generateGanttNarrative()` | Project phases, tasks, status tags |
| **User Journey** | `generateUserJourneyNarrative()` | Journey steps, satisfaction, actors |

### Ready for Implementation 🎯

These diagram types have clear, parseable syntax suitable for narrative generation:

| Type | Syntax | Parsing Approach |
|------|--------|-----------------|
| **Sequence** | Participants + messages with arrow types | Track interactions, activation, nesting |
| **State** | States + transitions + conditions | Parse state machines, entry/exit |
| **Entity** | Entities + cardinality + relationships | Extract relationships and constraints |
| **Git Graph** | Commits + branches + merges | Timeline of version control events |
| **C4** | Context/Container/Component/Code levels | Hierarchical architecture description |

### Future Candidates 🔮

| Type | Challenge | Potential Narrative |
|------|-----------|-------------------|
| **Quadrant** | 2D axis parsing | Item distribution across quadrants |
| **Mind Map** | Tree hierarchy | Root concept with branching ideas |
| **Sankey** | Flow values & quantities | Source-to-target transformations |
| **Timeline** | Chronological events | Ordered event descriptions |
| **Architecture** | Complex nesting | System design layers and interactions |

## Syntax Organization

### By Primary Purpose

**Logic & Process**: Flow control and decision-making
- Flowchart: Sequential steps and branching
- State Diagram: System state transitions
- Mind Map: Hierarchical concept exploration

**Interaction & Time**: Temporal and collaborative aspects
- Sequence: Message exchanges over time
- User Journey: User experience progression
- Gantt: Project timeline and scheduling
- Timeline: Chronological milestones

**Data Structure**: Object-oriented and relational
- Class: OOP inheritance and composition
- Entity: Data modeling and relationships
- C4: Architecture at multiple levels
- Architecture: System design visualization

**Data Visualization**: Proportional and comparative data
- Pie: Proportional breakdown
- Quadrant: 2x2 categorization
- Radar: Multi-dimensional comparison
- XY Chart: Correlation and trends
- Sankey: Flow quantities
- Treemap: Hierarchical proportions

**Domain-Specific**: Tools for specific problems
- Git Graph: Version control workflows
- Requirement: Requirements tracing
- Packet: Network protocol details
- Kanban: Task workflow management
- ZenUML: UML sequence alternative
- Block: System block connections

### By Complexity

**Simple** (Easy to parse and narrate):
- Pie, Quadrant, Timeline, Packet, Kanban, Treemap

**Medium** (Moderate parsing required):
- Flowchart, Gantt, Journey, Mindmap, State, Entity, Sankey, XY Chart, Block, Radar

**Complex** (Significant logic required):
- Sequence, Class, C4, Architecture, Git Graph, Requirement, ZenUML

## Common Syntax Patterns

All Mermaid diagrams follow these conventions:

```
<diagramType>
  %% Comments with double percent
  [diagram content]
```

### Universal Features

| Feature | Syntax | Support |
|---------|--------|---------|
| Comments | `%% text` | All diagrams |
| Accessibility | `accTitle` / `accDescr` | Most diagrams |
| Styling | `classDef` / `class` | Flowchart, State |
| Configuration | YAML frontmatter `---` | All diagrams |
| Themes | Via configuration | All diagrams |

### Relationship Markers (vary by type)

- **Flowchart**: `-->` (arrow), `---` (line), `-.-` (dotted)
- **State**: `-->` (transition)
- **Class**: `<|--` (inheritance), `*--` (composition), `o--` (aggregation)
- **Entity**: `||--o{` (cardinality with relationship type)
- **Sequence**: `->>`, `-->>`, `-x`, `--x`, `-)`

## Narrative Generation Strategy

### Current Implementation

1. **Flowchart**: Parse nodes and edges → describe flow path
2. **Pie**: Extract labels and values → calculate percentages
3. **Class**: Find classes and relationships → describe OOP structure
4. **Gantt**: Extract sections and tasks → describe project phases
5. **Journey**: Parse sections and steps → describe user experience

### Implementation Pattern

```javascript
function generateXNarrative(source) {
  // 1. Extract title/metadata
  const title = source.match(/title\s+(.+)/);
  
  // 2. Parse primary elements (nodes, tasks, etc.)
  const elements = [];
  source.split('\n').forEach(line => {
    // Regex parsing specific to diagram type
  });
  
  // 3. Generate prose narrative
  let narrative = '<p><strong>Structure:</strong></p>\n<ul>\n';
  elements.forEach(el => {
    narrative += formatElement(el);
  });
  narrative += '</ul>';
  
  return narrative;
}
```

### Narrative Output Template

```
[Title/Purpose]
  ↓
[Structured List of Primary Elements]
  ↓
[Stats/Summary]
  ↓
[Status/Tags if applicable]
```

## Adding Narrative Support for New Diagram Types

### Requirements

1. **Parseable syntax**: Must have clear line-based structure
2. **Primary elements**: Identifiable nodes/items (not pure layout)
3. **Meaningful narrative**: Can describe purpose and structure
4. **Regex patterns**: Able to extract via regular expressions

### Steps

1. Add diagram type to `detectDiagramType()` switch
2. Create `generate<Type>Narrative()` function
3. Implement regex parsing for primary elements
4. Generate meaningful prose narrative
5. Add to narrative generation switch in `generateDiagramNarrative()`
6. Update `NARRATIVE_SUPPORT` section in this JSON

### Example: Quadrant Chart

```javascript
function generateQuadrantNarrative(source) {
  // Parse:
  // - Quadrant titles (Q1, Q2, Q3, Q4)
  // - Item positions (x, y coordinates)
  // - Axis labels
  
  // Output: "Items distributed across [axis1] vs [axis2] quadrants:
  //  - Q1 (high X, high Y): [items]
  //  - Q2 (low X, high Y): [items]"
}
```

## Testing & Examples

### Sample Files Structure

```
examples/
├── flowchart-basic.mmd
├── sequence-basic.mmd
├── class-basic.mmd
├── state-basic.mmd
├── er-basic.mmd
├── journey-basic.mmd
├── journey-workday.mmd
├── journey-support.mmd
├── gantt-basic.mmd
├── gantt-project.mmd
└── pie-basic.mmd
```

Each example includes:
- `accTitle` for accessibility
- `accDescr` describing the diagram
- Clear syntax demonstrating features
- Supported narrative generation

### Regression Testing

Narrative generation should:
1. ✅ Not crash on malformed input
2. ✅ Extract all primary elements
3. ✅ Generate readable prose
4. ✅ Preserve HTML safety (escape user text)
5. ✅ Handle edge cases (empty diagrams, special characters)

## References

### Official Documentation
- [Syntax Reference](https://mermaid.js.org/intro/syntax-reference.html)
- [Flowchart](https://mermaid.js.org/syntax/flowchart.html)
- [Sequence](https://mermaid.js.org/syntax/sequenceDiagram.html)
- [Class](https://mermaid.js.org/syntax/classDiagram.html)
- [State](https://mermaid.js.org/syntax/stateDiagram.html)
- [Entity](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)
- [User Journey](https://mermaid.js.org/syntax/userJourney.html)
- [Gantt](https://mermaid.js.org/syntax/gantt.html)
- [Pie](https://mermaid.js.org/syntax/pie.html)
- [And 14 more...](https://mermaid.js.org/intro/syntax-reference.html)

### Accessibility References
- [Léonie Watson: Accessible SVG Flowcharts](https://tink.uk/accessible-svg-flowcharts/)
- [Carie Fisher: Accessible SVGs Pattern 11](https://cariefisher.com/a11y-svg-updated/)
- [AGENTS.md](./AGENTS.md) - Project philosophy and accessibility model

## JSON Schema Notes

The `MERMAID_DIAGRAM_TYPES.json` file is organized as:

```json
{
  "diagramTypes": {
    "<type>": {
      "id": "unique identifier",
      "name": "Display name",
      "documentation": "Link to official docs",
      "primaryElements": ["what this diagram contains"],
      "narrative": {
        "implemented": true/false,
        "generator": "function name if implemented",
        "reason": "why not implemented (if false)",
        "complexity": "low|medium|high"
      }
    }
  },
  "narrativeSupport": {
    "implemented": { /* 5 completed */ },
    "planned": { /* 5 ready */ },
    "considered": { /* others */ }
  },
  "syntaxOrganization": {
    "byPrimary": [ /* 5 categories */ ],
    "byComplexity": { /* simple, medium, complex */ },
    "byNarrativeReadiness": { /* ready, upcoming, future */ }
  }
}
```

## Future Enhancements

1. **Sequence Narrative**: Track message flow and parallel execution
2. **State Narrative**: Describe composite states and concurrency
3. **Architecture Narrative**: Explain C4 levels and component relationships
4. **Git Graph Narrative**: Summarize branching strategy and merge points
5. **Multi-diagram projects**: Narrative across related diagrams

---

**Last Updated**: January 16, 2026  
**Compatible with**: Mermaid 10.6.1+  
**Project**: [a11y-mermaid-studio](https://github.com/mgifford/a11y-mermaid-studio)
