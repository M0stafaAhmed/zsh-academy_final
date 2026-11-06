/* ═══════════════════════════════════════════════════════
   script.js – Zsh Mastery Academy
   Progress tracking | Quizzes | Certificate | Sidebar
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── Data ────────────────────────────────────────────── */
const LEVELS = [
  { id: 0, label: 'Terminal Survival',                color: '#8b949e', bg: '#21262d' },
  { id: 1, label: 'Command Fluency',                  color: '#3fb950', bg: '#1b2a1e' },
  { id: 2, label: 'Shell Syntax',                     color: '#58a6ff', bg: '#1a2332' },
  { id: 3, label: 'Automation Scripting',             color: '#d2991d', bg: '#2a1f0e' },
  { id: 4, label: 'Advanced Zsh Engineering',         color: '#bc8cff', bg: '#1e1a2e' },
  { id: 5, label: 'Pentest Automation',               color: '#ff7b72', bg: '#2d1515' },
  { id: 6, label: 'Professional Toolkit',             color: '#f0883e', bg: '#2a1a0e' },
];

const BRANCHES = {
  foundation:  { label: 'Zsh Command Foundation',      icon: '⚡', color: '#3fb950' },
  engineering: { label: 'Zsh Scripting Engineering',   icon: '⚙️',  color: '#58a6ff' },
  pentest:     { label: 'Pentest Automation with Zsh', icon: '🛡️',  color: '#ff7b72' },
};

const TOPICS = [
  /* ── Level 0 ────────────────────────────────────── */
  {
    id: 'terminal-basics', level: 0, branch: 'foundation',
    title: 'Terminal Survival Basics',
    description: 'Navigation, file ops, and the absolute shell floor.',
    tags: ['navigation', 'files', 'basics'],
    intro: 'Before writing a single script you must feel at home in the terminal. This module covers the irreducible minimum — the commands you reach for every single session.',
    sections: [
      {
        heading: 'Navigation Commands',
        table: {
          headers: ['Command', 'What it does', 'Example'],
          rows: [
            ['pwd',  'Print working directory',       'pwd → /home/user'],
            ['cd',   'Change directory',              'cd /etc  |  cd ~  |  cd -'],
            ['ls',   'List directory contents',       'ls -lah /var/log'],
            ['tree', 'Directory tree (if installed)', 'tree -L 2 .'],
          ]
        }
      },
      {
        heading: 'File Operations',
        table: {
          headers: ['Command', 'What it does', 'Example'],
          rows: [
            ['cp',    'Copy file/dir',          'cp -r src/ dst/'],
            ['mv',    'Move/rename',            'mv old.txt new.txt'],
            ['rm',    'Remove',                 'rm -rf /tmp/test'],
            ['mkdir', 'Make directory',         'mkdir -p a/b/c'],
            ['touch', 'Create empty file',      'touch notes.txt'],
            ['chmod', 'Change permissions',     'chmod 755 script.zsh'],
            ['chown', 'Change ownership',       'chown user:group file'],
          ]
        }
      },
      {
        heading: 'Reading Files',
        table: {
          headers: ['Command', 'Use case'],
          rows: [
            ['cat file',     'Dump entire file to stdout'],
            ['less file',    'Paginate large files (q to quit)'],
            ['head -n 20 f', 'First 20 lines'],
            ['tail -n 20 f', 'Last 20 lines'],
            ['tail -f f',    'Follow live log output'],
            ['wc -l file',   'Count lines'],
          ]
        }
      },
      {
        heading: 'Getting Help',
        table: {
          headers: ['Command', 'What you get'],
          rows: [
            ['man ls',       'Full manual page'],
            ['ls --help',    'Quick flag reference'],
            ['type ls',      'Builtin, alias, or binary?'],
            ['whence -v ls', 'Zsh-native: full origin report'],
          ]
        },
        tip: "In Zsh, `whence -v` is more informative than both `which` and `type`. Use it when debugging why a command behaves unexpectedly."
      },
    ]
  },
  /* ── Level 1 ────────────────────────────────────── */
  {
    id: 'pipes-redirects', level: 1, branch: 'foundation',
    title: 'Pipes, Redirects & I/O',
    description: 'stdin, stdout, stderr, pipes, tee, and process substitution.',
    tags: ['pipes', 'io', 'redirect'],
    intro: 'Unix philosophy: small tools that compose. Pipes and redirects are the glue. Mastering I/O turns commands into pipelines — and pipelines into power.',
    sections: [
      {
        heading: 'Standard Streams',
        table: {
          headers: ['FD', 'Name', 'Default'],
          rows: [
            ['0', 'stdin',  'Keyboard'],
            ['1', 'stdout', 'Terminal'],
            ['2', 'stderr', 'Terminal'],
          ]
        }
      },
      {
        heading: 'Redirection Operators',
        table: {
          headers: ['Operator', 'Effect', 'Example'],
          rows: [
            ['> file',    'Overwrite stdout to file',           'ls > out.txt'],
            ['>> file',   'Append stdout to file',              'echo hi >> log.txt'],
            ['2> file',   'Redirect stderr to file',            'cmd 2> err.txt'],
            ['2>&1',      'Redirect stderr → same as stdout',   'cmd > all.txt 2>&1'],
            ['&> file',   'Redirect both stdout+stderr',        'cmd &> all.txt'],
            ['< file',    'Feed file to stdin',                 'sort < data.txt'],
            ['<<< "str"', 'Herestring (string as stdin)',       'wc -w <<< "hello world"'],
          ]
        }
      },
      {
        heading: 'Pipes & Process Substitution',
        code: {
          lang: 'zsh', text:
`# Classic pipeline
cat /etc/passwd | cut -d: -f1 | sort | uniq

# Pipe stderr too (Zsh/Bash)
gcc main.c |& grep error

# Process substitution — treat cmd output as a file
diff <(ls dir1) <(ls dir2)

# Tee to multiple consumers simultaneously
cat big.log > >(grep ERROR > errors.log) \\
            > >(grep WARN  > warns.log)`
        },
        tip: "Process substitution eliminates temp files entirely. No cleanup needed, no race conditions."
      },
    ]
  },
  {
    id: 'text-tools', level: 1, branch: 'foundation',
    title: 'Text Processing Tools',
    description: 'grep, sed, awk, cut, sort, uniq — the operator toolkit.',
    tags: ['grep', 'sed', 'awk', 'text', 'parsing'],
    intro: 'A shell operator without grep, sed, and awk is like a surgeon without scalpels. These tools transform raw text output into structured, actionable data.',
    sections: [
      {
        heading: 'grep — Pattern Matching',
        table: {
          headers: ['Flag', 'Effect', 'Example'],
          rows: [
            ['-i',  'Case-insensitive',           'grep -i error log.txt'],
            ['-r',  'Recursive directory search', 'grep -r "TODO" src/'],
            ['-n',  'Show line numbers',          'grep -n "fail" app.log'],
            ['-v',  'Invert match',               'grep -v "^#" config'],
            ['-E',  'Extended regex (ERE)',        'grep -E "err|warn" log'],
            ['-o',  'Print only matching part',   'grep -oE "[0-9.]+" log'],
            ['-c',  'Count matching lines',       'grep -c "404" access.log'],
            ['-l',  'List matching filenames',    'grep -rl "passwd" /etc'],
          ]
        }
      },
      {
        heading: 'sed & awk',
        code: {
          lang: 'zsh', text:
`# sed – substitute all matches
sed 's/foo/bar/g' file

# sed – delete comment lines
sed '/^#/d' config.txt

# awk – print 2nd field
awk '{print $2}' file

# awk – custom delimiter (CSV)
awk -F: '{print $1}' /etc/passwd

# awk – sum a column
awk '{sum += $4} END {print sum}' data.txt`
        }
      },
      {
        heading: 'cut, sort, uniq',
        table: {
          headers: ['Command', 'Usage', 'Notes'],
          rows: [
            ['cut -d: -f1',  'Extract field by delimiter', 'cut -d, -f1,3 file.csv'],
            ['sort',         'Lexicographic sort',          'sort -n numeric, -r reverse'],
            ['uniq -c',      'Count consecutive dupes',     'Always pipe sort first'],
            ['tr -d "\\r"',  'Delete chars',                'Windows→Unix line endings'],
          ]
        },
        tip: "Holy trinity: grep PATTERN log | sort | uniq -c | sort -rn — frequency-ranked list of matches in one pipeline."
      },
    ]
  },
  /* ── Level 2 ────────────────────────────────────── */
  {
    id: 'variables', level: 2, branch: 'foundation',
    title: 'Variables & Parameter Expansion',
    description: 'Scalar, arrays, assoc arrays, typeset flags, expansion modifiers.',
    tags: ['variables', 'parameters', 'expansion', 'arrays'],
    intro: "Zsh has one of the richest parameter expansion systems in any shell. Variables aren't just storage — they're the primary data manipulation layer.",
    sections: [
      {
        heading: 'Variable Types & typeset',
        table: {
          headers: ['Declaration', 'Type', 'Example'],
          rows: [
            ['name=value',    'Scalar (string)',   'greeting="hello world"'],
            ['typeset -i n',  'Integer',           'typeset -i count=0; count+=1'],
            ['typeset -r V',  'Readonly',          'typeset -r MAX=100'],
            ['typeset -x V',  'Exported (env)',    'typeset -x API_KEY=secret'],
            ['typeset -l V',  'Auto-lowercase',    'typeset -l s; s="HELLO" → hello'],
            ['typeset -a arr','Indexed array',     'typeset -a hosts=(a b c)'],
            ['typeset -A map','Associative array', 'typeset -A ports=([http]=80)'],
          ]
        }
      },
      {
        heading: 'Indexed Arrays (1-indexed in Zsh!)',
        code: {
          lang: 'zsh', text:
`hosts=(kali parrot arch)

echo $hosts[1]      # kali  ← Zsh is 1-indexed!
echo $hosts[-1]     # arch  ← last element
echo $hosts[1,2]    # kali parrot  ← slice
echo \${#hosts}      # 3  ← length

hosts+=(ubuntu)     # append

for h in $hosts; do echo $h; done`
        }
      },
      {
        heading: 'Expansion Flags (The Power Layer)',
        table: {
          headers: ['Flag', 'Effect', 'Example'],
          rows: [
            ['${#var}',         'Length',                  '${#mystr}'],
            ['${var:-default}', 'Default if unset',        '${NAME:-anon}'],
            ['${var:?msg}',     'Error if unset',          '${TARGET:?"required"}'],
            ['${var##*/}',      'Remove longest prefix',   'basename from path'],
            ['${var%.gz}',      'Remove suffix',           'strip extension'],
            ['${var//old/new}', 'Replace all matches',     '${str// /_}'],
            ['${(U)var}',       'Uppercase (Zsh)',         '${(U)hostname}'],
            ['${(s:,:)var}',    'Split on delimiter',      '${(s:,:)csv_line}'],
            ['${(j:,:)arr}',    'Join array',              '${(j:,:)hosts}'],
            ['${(u)arr}',       'Unique elements',         '${(u)ips}'],
            ['${(o)arr}',       'Sort array',              '${(o)targets}'],
          ]
        },
        tip: "The (flags) syntax is unique to Zsh. Learn these and you'll rarely need awk for string manipulation."
      },
    ]
  },
  {
    id: 'conditionals', level: 2, branch: 'foundation',
    title: 'Conditionals & Tests',
    description: 'if/elif/else, case, [[, arithmetic tests, file tests.',
    tags: ['if', 'case', 'test', 'conditional'],
    intro: "Zsh's test operators go well beyond POSIX. The [[ compound test prevents word-splitting bugs, supports && and || natively, and supports regex with =~.",
    sections: [
      {
        heading: 'File & String Tests',
        table: {
          headers: ['Operator', 'True when'],
          rows: [
            ['-e file',   'File exists (any type)'],
            ['-f file',   'Regular file'],
            ['-d file',   'Directory'],
            ['-x file',   'Executable'],
            ['-s file',   'Size > 0 (non-empty)'],
            ['-z "$var"', 'Variable is empty'],
            ['-n "$var"', 'Variable is non-empty'],
            ['f1 -nt f2', 'f1 is newer than f2'],
          ]
        }
      },
      {
        heading: '[[ vs (( — When to Use Each',
        code: {
          lang: 'zsh', text:
`# [[ for strings, files, and regex
[[ $x == "yes" ]] && echo ok
[[ $ip =~ ^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+$ ]] && echo valid
[[ -f /etc/passwd ]] && echo "exists"

# (( for arithmetic — no $ needed inside
x=5
(( x > 3 )) && echo "greater"
(( x % 2 == 0 )) && echo "even"
(( count++ ))`
        }
      },
      {
        heading: 'case Statement',
        code: {
          lang: 'zsh', text:
`case "$action" in
  start)       systemctl start sshd  ;;
  stop)        systemctl stop sshd   ;;
  status|stat) systemctl status sshd ;;
  *)           echo "Unknown: $action"; exit 1 ;;
esac

# Zsh fallthrough with ;&
case "$flag" in
  -v|--verbose) VERBOSE=1 ;&   # fallthrough!
  -d|--debug)   DEBUG=1   ;;
esac`
        }
      },
    ]
  },
  {
    id: 'loops', level: 2, branch: 'foundation',
    title: 'Loops & Iteration',
    description: 'for, while, until, repeat (Zsh-only), C-style, loop control.',
    tags: ['loops', 'for', 'while', 'iteration'],
    intro: "Loops are the engine of automation. Zsh adds `repeat` and uniquely safe iteration patterns on top of the POSIX set.",
    sections: [
      {
        heading: 'for Loop Variants',
        code: {
          lang: 'zsh', text:
`# Over array
for host in kali parrot arch; do
  echo "Scanning $host"
done

# Over glob
for f in /var/log/*.log; do wc -l "$f"; done

# C-style
for (( i=0; i<10; i++ )); do echo $i; done

# Over file lines safely (Zsh split on newlines)
for line in \${(f)"$(cat hosts.txt)"}; do
  nmap -sV "$line"
done`
        }
      },
      {
        heading: 'while / until / repeat',
        code: {
          lang: 'zsh', text:
`# while
while [[ -f /tmp/lockfile ]]; do sleep 1; done

# until (runs UNTIL condition becomes true)
until ping -c1 $target &>/dev/null; do
  echo "Waiting..."; sleep 5
done

# repeat — Zsh-only, run exactly N times
repeat 3 echo "ping"

# Read file line by line safely
while IFS= read -r line; do
  echo "$line"
done < targets.txt`
        },
        tip: "Never use `for line in $(cat file)` — it breaks on spaces and newlines. Always use `while IFS= read -r line; do ... done < file`."
      },
    ]
  },
  /* ── Level 3 ────────────────────────────────────── */
  {
    id: 'functions', level: 3, branch: 'engineering',
    title: 'Functions & Scope',
    description: 'Definition, local vars, return values, autoload.',
    tags: ['functions', 'scope', 'autoload', 'local'],
    intro: "Functions are the primary modularization unit in Zsh scripts. Understanding scope, return values, and autoloading is essential for maintainable tooling.",
    sections: [
      {
        heading: 'Definition & Arguments',
        code: {
          lang: 'zsh', text:
`greet() { echo "Hello, $1"; }
greet "world"   # → Hello, world

resolve_host() {
  local host="$1"
  local ip
  ip=$(dig +short "$host" | head -1)
  [[ -z $ip ]] && return 1  # failure
  echo "$ip"                # "return" via stdout
}

# Capture returned string value
ip=$(resolve_host example.com) && echo "Resolved: $ip"`
        }
      },
      {
        heading: 'Scope & Local Variables',
        code: {
          lang: 'zsh', text:
`x=global

demo() {
  local x=local
  local -a items=(a b c)   # local array
  echo "Inside: $x"        # → local
}

demo
echo "Outside: $x"         # → global  (unchanged!)`
        },
        tip: "Always use `local` for function-internal variables. Without it, functions silently mutate global state — the source of many subtle script bugs."
      },
      {
        heading: 'Autoload',
        code: {
          lang: 'zsh', text:
`# .zshrc — add custom functions directory
fpath=(~/.zsh/functions $fpath)
autoload -Uz my_function

# ~/.zsh/functions/my_function
# (file contains ONLY the function body)
local target="$1"
echo "Processing $target"`
        }
      },
    ]
  },
  {
    id: 'glob-patterns', level: 3, branch: 'engineering',
    title: 'Globbing & Glob Qualifiers',
    description: "Extended globs, recursive **, glob qualifiers — Zsh's superpower.",
    tags: ['glob', 'wildcard', 'patterns'],
    intro: "Zsh globbing is so powerful that many operators requiring `find` in other shells can be done with a single glob. Glob qualifiers are a unique Zsh capability.",
    sections: [
      {
        heading: 'Glob Patterns',
        table: {
          headers: ['Pattern', 'Matches', 'Example'],
          rows: [
            ['*',         'Any string (not /)',   '*.log'],
            ['?',         'Any single char',      'file?.txt'],
            ['[abc]',     'One of a, b, c',       '[0-9]*.sh'],
            ['**',        'Recursive any depth',  '**/  *.conf'],
            ['!(pattern)','NOT matching (extglob)','!(*.txt)'],
          ]
        }
      },
      {
        heading: 'Glob Qualifiers',
        table: {
          headers: ['Qualifier', 'Filter'],
          rows: [
            ['*(.)',    'Regular files only'],
            ['*(/)',    'Directories only'],
            ['*(@)',    'Symbolic links only'],
            ['*(x)',    'Executable files'],
            ['*(Lm+1)', 'Files larger than 1 MB'],
            ['*(mh-1)', 'Modified in last hour'],
            ['*(Om)',   'Sort by mtime (newest first)'],
            ['*(^/)',   'Not directories'],
          ]
        },
        code: {
          lang: 'zsh', text:
`# 5 largest files (OL=reverse size sort, [1,5]=top 5)
ls -lh *(.OL[1,5])

# Log files modified in last 24 hours
ls /var/log/**/*.log(mh-24)

# All empty files
ls *(.L0)

# Executables only
print -l /usr/bin/*(x.)`
        },
        tip: "Glob qualifiers replace most `find` calls. `*(.x)` is faster and more readable than `find . -type f -executable`."
      },
    ]
  },
  {
    id: 'setopt', level: 3, branch: 'engineering',
    title: 'Shell Options (setopt)',
    description: "Key Zsh options that change shell behavior — know what's on by default.",
    tags: ['setopt', 'options', 'configuration'],
    intro: "Zsh has over 200 shell options. Knowing the impactful ones changes how you write scripts and interact with the shell.",
    sections: [
      {
        heading: 'Navigation & Safety Options',
        table: {
          headers: ['Option', 'Effect'],
          rows: [
            ['AUTO_CD',        'Type a dir name to cd into it'],
            ['AUTO_PUSHD',     'Every cd pushes to directory stack'],
            ['NO_CLOBBER',     'Prevent > from overwriting files'],
            ['RM_STAR_WAIT',   'Pause 10s before rm * runs'],
            ['CORRECT',        'Suggest corrections for mistyped commands'],
          ]
        }
      },
      {
        heading: 'Scripting Options',
        table: {
          headers: ['Option', 'Effect'],
          rows: [
            ['ERR_EXIT',      'set -e: exit on first error'],
            ['PIPE_FAIL',     'Pipe fails if ANY segment fails'],
            ['NO_UNSET',      'Error on unset variable use'],
            ['EXTENDED_GLOB', 'Enable !, ^, # glob patterns'],
            ['NULL_GLOB',     'No error if glob matches nothing'],
            ['LOCAL_OPTIONS', 'Options in functions are scoped'],
            ['LOCAL_TRAPS',   'Traps in functions are scoped'],
          ]
        },
        code: {
          lang: 'zsh', text:
`#!/usr/bin/env zsh
# Recommended script header
setopt ERR_EXIT PIPE_FAIL NO_UNSET
emulate -LR zsh   # reset all options to Zsh defaults first`
        },
        tip: "Always set ERR_EXIT and PIPE_FAIL in production scripts. Ignoring pipeline errors is responsible for a huge class of silent script bugs."
      },
    ]
  },
  /* ── Level 4 ────────────────────────────────────── */
  {
    id: 'zle', level: 4, branch: 'engineering',
    title: 'Zsh Line Editor (ZLE)',
    description: 'Key bindings, custom widgets, vi-mode, prompt editing internals.',
    tags: ['zle', 'keybindings', 'vi-mode'],
    intro: "ZLE is Zsh's built-in line editor — it handles everything you type at the prompt. Understanding ZLE lets you create powerful custom keybindings and editing widgets.",
    sections: [
      {
        heading: 'Bindkey & Modes',
        code: {
          lang: 'zsh', text:
`bindkey -e           # Emacs mode (default)
bindkey -v           # Vi mode
bindkey              # List all bindings

# Ctrl+X Ctrl+E → edit command in $EDITOR
autoload -Uz edit-command-line
zle -N edit-command-line
bindkey '^X^E' edit-command-line

# Ctrl+R → history search
bindkey '^R' history-incremental-search-backward`
        }
      },
      {
        heading: 'Custom Widgets',
        code: {
          lang: 'zsh', text:
`# Prepend sudo with Alt+S
_insert_sudo() {
  BUFFER="sudo $BUFFER"
  CURSOR=$(( CURSOR + 5 ))
}
zle -N _insert_sudo
bindkey '^[s' _insert_sudo`
        }
      },
      {
        heading: 'ZLE Special Variables',
        table: {
          headers: ['Variable', 'Contains'],
          rows: [
            ['$BUFFER',     'Full current command line text'],
            ['$CURSOR',     'Cursor position (integer)'],
            ['$LBUFFER',    'Text left of cursor'],
            ['$RBUFFER',    'Text right of cursor'],
            ['$WIDGET',     'Name of currently executing widget'],
          ]
        },
        tip: "ZLE widgets can read and modify $BUFFER and $CURSOR. This makes them extremely powerful for command-line automation without any subprocess overhead."
      },
    ]
  },
  {
    id: 'completion-system', level: 4, branch: 'engineering',
    title: 'Completion System (compsys)',
    description: 'compinit, zstyle configuration, writing custom completions.',
    tags: ['completion', 'compsys', 'compinit', 'tab'],
    intro: "Zsh's completion system (compsys) is the most advanced tab-completion framework in any shell. It is fully programmable and context-aware.",
    sections: [
      {
        heading: 'Setup & zstyle',
        code: {
          lang: 'zsh', text:
`# .zshrc
autoload -Uz compinit
compinit -d ~/.zcompdump

# Case-insensitive matching
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'

# Arrow-key browsable menu
zstyle ':completion:*' menu select

# Color files using LS_COLORS
zstyle ':completion:*:default' list-colors \${(s.:.)LS_COLORS}

# Enable caching
zstyle ':completion::complete:*' use-cache on`
        }
      },
      {
        heading: 'Writing a Custom Completion',
        code: {
          lang: 'zsh', text:
`#compdef mytool
# Save as _mytool in a $fpath directory

_mytool() {
  local -a cmds=(
    'scan:Run a network scan'
    'report:Generate a report'
    'config:Manage configuration'
  )
  case $words[2] in
    scan) _arguments '-t[target]:target:_hosts' ;;
    *)    _describe 'subcommand' cmds ;;
  esac
}
_mytool "$@"`
        }
      },
    ]
  },
  {
    id: 'traps', level: 4, branch: 'engineering',
    title: 'Traps & Signal Handling',
    description: 'trap, EXIT, ERR, INT, TERM — clean shutdown and error hooks.',
    tags: ['trap', 'signals', 'exit', 'error'],
    intro: "Professional scripts handle interruptions gracefully. Traps let you register cleanup code for signals and the special EXIT/ERR pseudo-signals.",
    sections: [
      {
        heading: 'Common Trap Patterns',
        code: {
          lang: 'zsh', text:
`# Cleanup on any exit (success or failure)
trap 'rm -f /tmp/scan_$$.tmp' EXIT

# Handle Ctrl+C (SIGINT)
trap 'echo "Interrupted"; exit 130' INT

# Error handler — fires on non-zero exit
trap 'echo "Error on line $LINENO"' ERR`
        }
      },
      {
        heading: 'Professional Cleanup Pattern',
        code: {
          lang: 'zsh', text:
`#!/usr/bin/env zsh
setopt ERR_EXIT

TMPDIR=$(mktemp -d)
LOCKFILE=/var/run/myscript.lock

cleanup() {
  rm -rf "$TMPDIR"
  rm -f  "$LOCKFILE"
  echo "Cleaned up"
}

# Register BEFORE any resource-creating code
trap cleanup EXIT INT TERM

touch "$LOCKFILE"
# ... rest of script runs here safely ...`
        },
        tip: "Register your cleanup trap at the TOP of the script, before any code that creates resources. EXIT fires even when ERR_EXIT kills the script."
      },
    ]
  },
  {
    id: 'advanced-expansion', level: 4, branch: 'engineering',
    title: 'Advanced Parameter Expansion',
    description: 'Nested expansions, (f) flag, zparseopts, array operations.',
    tags: ['parameter', 'expansion', 'zparseopts'],
    intro: "This module goes deep on Zsh-specific parameter expansion capabilities with no equivalent in other shells.",
    sections: [
      {
        heading: '(f) Flag — Safe Line Splitting',
        code: {
          lang: 'zsh', text:
`# Split command output into array, one element per line
typeset -a lines
lines=( \${(f)"$(cat /etc/hosts)"} )

for line in $lines; do
  [[ $line =~ ^[0-9] ]] && echo $line
done

# Without (f) you get word-split output — usually wrong`
        }
      },
      {
        heading: 'Nested Expansions',
        code: {
          lang: 'zsh', text:
`typeset -a ips=(10.0.0.1 192.168.1.1 10.0.0.1 10.0.0.2)

echo \${(uo)ips}          # unique + sorted
echo \${(j:,:)\${(u)ips}}  # join unique with commas
echo \${(U)ips}           # uppercase all`
        }
      },
      {
        heading: 'zparseopts — Professional Arg Parsing',
        code: {
          lang: 'zsh', text:
`scan_tool() {
  local -a _t _v _h
  zparseopts -D -E \\
    t:=_t -target:=_t \\
    v=_v  -verbose=_v \\
    h=_h  -help=_h || return 1

  (( \${+_h[1]} )) && { echo "Usage: scan_tool -t <target>"; return }

  local target=\${_t[-1]:-""}
  local verbose=$(( \${+_v[1]} ))

  echo "Target: $target | Verbose: $verbose"
}
scan_tool -t 10.10.10.1 -v`
        },
        tip: "zparseopts is the professional way to parse flags in Zsh. It handles -s, --long, required args, and leaves remaining positional args in \$@."
      },
    ]
  },
  /* ── Level 5 ────────────────────────────────────── */
  {
    id: 'recon-wrappers', level: 5, branch: 'pentest',
    title: 'Recon Wrappers',
    description: 'Wrap nmap, dig, whois, curl into structured Zsh recon scripts.',
    tags: ['recon', 'nmap', 'osint', 'wrapper'],
    intro: "Raw tool output is noise. Recon wrappers normalize tool output into structured, diffable data that feeds downstream pipeline stages.",
    sections: [
      {
        heading: 'Host Discovery Wrapper',
        code: {
          lang: 'zsh', text:
`#!/usr/bin/env zsh
setopt ERR_EXIT PIPE_FAIL

SWEEP_OUT="\${RECON_DIR:-/tmp}/hosts_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$SWEEP_OUT"

sweep_range() {
  local range="$1"
  echo "[*] Sweeping $range"

  nmap -sn -PE "$range" -oG "$SWEEP_OUT/icmp.gnmap" 2>/dev/null

  grep "Up$" "$SWEEP_OUT/icmp.gnmap" \\
    | awk '{print $2}' | sort -u \\
    > "$SWEEP_OUT/live_hosts.txt"

  echo "[+] Found $(wc -l < "$SWEEP_OUT/live_hosts.txt") hosts"
}
sweep_range "\${1:-192.168.1.0/24}"`
        }
      },
      {
        heading: 'DNS Enumeration Pipeline',
        code: {
          lang: 'zsh', text:
`dns_enum() {
  local domain="$1"
  local out="/tmp/dns_\${domain}"
  mkdir -p "$out"

  for type in A AAAA MX NS TXT SOA; do
    dig +noall +answer "$domain" "$type" > "$out/\${type}.txt"
  done

  # Zone transfer attempt
  local ns=$(dig +short "$domain" NS | head -1)
  [[ -n $ns ]] && dig axfr "$domain" @"$ns" > "$out/axfr.txt" 2>&1

  echo "=== DNS Summary: $domain ==="
  for f in "$out"/*.txt; do echo "  $(basename $f): $(wc -l < $f) records"; done
}
dns_enum "\${1:?Usage: $0 <domain>}"`
        }
      },
      {
        heading: 'HTTP Fingerprinter',
        code: {
          lang: 'zsh', text:
`http_finger() {
  local target="$1" port="\${2:-80}" proto="\${3:-http}"
  local headers
  headers=$(curl -skI --max-time 5 "\${proto}://\${target}:\${port}/")

  echo "$headers" | grep -iE "server:|x-powered-by:|x-generator:" | sed 's/^/  /'

  typeset -A waf_sigs=([cloudflare]="CF-Ray" [akamai]="X-Akamai" [sucuri]="X-Sucuri-ID")
  for name sig in \${(kv)waf_sigs}; do
    echo "$headers" | grep -qi "$sig" && echo "[!] WAF: $name"
  done
}`
        }
      },
    ]
  },
  {
    id: 'port-scanning', level: 5, branch: 'pentest',
    title: 'Port Scan Automation',
    description: 'Multi-stage scan pipelines, result parsing, bulk scanning.',
    tags: ['nmap', 'ports', 'scanning', 'pipeline'],
    intro: "A professional port scan is a staged pipeline: fast sweep → targeted version scan → service-specific scripts. Never run it as a single monolithic command.",
    sections: [
      {
        heading: 'Two-Stage Scan Pipeline',
        code: {
          lang: 'zsh', text:
`staged_scan() {
  local target="$1"
  local out="/tmp/scans/\${target//\\//_}"
  mkdir -p "$out"

  # Stage 1: fast all-ports
  nmap -p- --min-rate 5000 -T4 -oG "$out/allports.gnmap" "$target"

  local ports
  ports=$(grep "Ports:" "$out/allports.gnmap" \\
    | grep -oP '\\d+(?=/open)' | sort -n | tr '\\n' ',' | sed 's/,$//')

  [[ -z $ports ]] && { echo "[-] No open ports"; return 1; }
  echo "[*] Open ports: $ports"

  # Stage 2: version + scripts on open ports only
  nmap -sV -sC -p "$ports" -oN "$out/services.txt" "$target"
  echo "[+] Results: $out/services.txt"
}`
        }
      },
      {
        heading: 'Parallel Bulk Scanner',
        code: {
          lang: 'zsh', text:
`bulk_scan() {
  local file="$1" max="\${2:-5}"
  local -a pids
  local count=0

  while IFS= read -r target; do
    [[ -z $target || $target == "#"* ]] && continue
    staged_scan "$target" &
    pids+=($!)
    (( ++count ))
    if (( count % max == 0 )); then
      wait "\${pids[@]}"; pids=()
      echo "[*] Batch of $max complete"
    fi
  done < "$file"

  wait "\${pids[@]}" 2>/dev/null
  echo "[+] All scans complete"
}
bulk_scan targets.txt 5`
        },
        tip: "The modulo batch pattern (wait every N) prevents network flooding. Tune max based on your bandwidth and target environment."
      },
    ]
  },
  {
    id: 'evidence-reporting', level: 5, branch: 'pentest',
    title: 'Evidence Collection & Reporting',
    description: 'Session logging, structured output, Markdown report generation.',
    tags: ['evidence', 'reporting', 'logs', 'documentation'],
    intro: "An engagement is only as good as its documentation. Automated evidence collection ensures nothing gets lost and reports essentially write themselves.",
    sections: [
      {
        heading: 'Session Logger',
        code: {
          lang: 'zsh', text:
`#!/usr/bin/env zsh
ENGAGEMENT="\${ENGAGEMENT:-unnamed}"
LOG_ROOT="/engagements/\${ENGAGEMENT}/logs"
mkdir -p "$LOG_ROOT"
LOGFILE="$LOG_ROOT/session_$(date +%Y%m%d_%H%M%S).log"

start_logging() {
  exec > >(tee -a "$LOGFILE") 2>&1
  echo "=== Session Start: $(date) | User: $USER | Target: \${TARGET:-unset} ==="
}

annotate() { echo "\\n### [$(date +%H:%M:%S)] NOTE: $* ###\\n" | tee -a "$LOGFILE"; }
alias note=annotate
start_logging`
        }
      },
      {
        heading: 'Markdown Report Generator',
        code: {
          lang: 'zsh', text:
`gen_report() {
  local scan_dir="$1" out="\${2:-report.md}"
  {
    echo "# Penetration Test Report"
    echo "**Date:** $(date +%Y-%m-%d) | **Operator:** $USER"
    echo ""
    echo "## Hosts Discovered"
    echo '\\\`\\\`\\\`'
    cat "$scan_dir/live_hosts.txt" 2>/dev/null || echo "none"
    echo '\\\`\\\`\\\`'
    echo "## Open Services"
    find "$scan_dir" -name "services.txt" -exec cat {} \\;
  } > "$out"
  echo "[+] Report: $out"
}`
        }
      },
    ]
  },
  /* ── Level 6 ────────────────────────────────────── */
  {
    id: 'toolkit-arch', level: 6, branch: 'pentest',
    title: 'Toolkit Architecture',
    description: 'Shared libraries, dispatcher pattern, professional toolkit structure.',
    tags: ['architecture', 'library', 'toolkit'],
    intro: "A professional toolkit is not a collection of scripts — it is a framework with shared libraries, a dispatch layer, and consistent I/O conventions.",
    sections: [
      {
        heading: 'Directory Structure',
        code: {
          lang: 'zsh', text:
`~/.pentools/
├── bin/pt               # main dispatcher
├── lib/
│   ├── common.zsh       # colors, logging, assertions
│   ├── network.zsh      # resolve, ping, port checks
│   └── output.zsh       # json_out, table_out, report
├── modules/
│   ├── recon/dns.zsh
│   ├── recon/http.zsh
│   ├── scan/ports.zsh
│   └── post/enum.zsh
└── engagements/
    └── 2025-client/
        ├── scope.txt
        ├── notes.md
        └── evidence/`
        }
      },
      {
        heading: 'lib/common.zsh',
        code: {
          lang: 'zsh', text:
`typeset -r C_RED=$'\\e[31m' C_GRN=$'\\e[32m'
typeset -r C_YLW=$'\\e[33m' C_RST=$'\\e[0m'

log_info() { print "\${C_GRN}[*]\${C_RST} $*"; }
log_warn() { print "\${C_YLW}[!]\${C_RST} $*" >&2; }
log_err()  { print "\${C_RED}[-]\${C_RST} $*" >&2; }

require_tool() {
  command -v "$1" &>/dev/null || {
    log_err "Required: $1"; exit 1
  }
}

ts() { date +%Y%m%d_%H%M%S; }`
        }
      },
      {
        heading: 'Dispatcher (bin/pt)',
        code: {
          lang: 'zsh', text:
`#!/usr/bin/env zsh
TOOLKIT="\${0:A:h:h}"   # resolve root from symlink
source "$TOOLKIT/lib/common.zsh"

zparseopts -D -E \\
  t:=_t -target:=_t \\
  v=_v  -verbose=_v \\
  h=_h  -help=_h

(( \${+_h[1]} )) && { usage; exit 0; }
[[ -n \${_t[-1]:-} ]] && export TARGET="\${_t[-1]}"

module="\${1:?Usage: pt <module> <cmd>}"
cmd="\${2:?Usage: pt <module> <cmd>}"
shift 2

mod="$TOOLKIT/modules/\${module}/\${cmd}.zsh"
[[ -f $mod ]] || { log_err "Unknown: pt $module $cmd"; exit 1; }
source "$mod" && \${cmd//-/_} "$@"`
        },
        tip: "The \${0:A:h:h} pattern resolves the absolute path and traverses two parent dirs — making the toolkit work from any symlink or cwd."
      },
    ]
  },
  {
    id: 'zsh-modules', level: 6, branch: 'engineering',
    title: 'Zsh Modules (zmodload)',
    description: 'zsh/net/tcp, zsh/datetime, zsh/mathfunc, zsh/stat, zsh/zutil.',
    tags: ['zmodload', 'modules', 'tcp', 'datetime'],
    intro: "Zsh ships with loadable modules that add capabilities normally requiring external tools. Invaluable in constrained environments.",
    sections: [
      {
        heading: 'Available Modules',
        table: {
          headers: ['Module', 'Adds capability'],
          rows: [
            ['zsh/net/tcp',  'Raw TCP socket I/O — no netcat needed'],
            ['zsh/datetime', 'strftime, $EPOCHREALTIME (microsecond)'],
            ['zsh/mathfunc', 'sin, cos, log, sqrt — shell math'],
            ['zsh/stat',     'File stat without calling /usr/bin/stat'],
            ['zsh/zutil',    'zparseopts, zformat, zregexparse'],
            ['zsh/pcre',     'Perl-compatible regex (pcre_match)'],
            ['zsh/zpty',     'Pseudo-terminal control (expect-like)'],
          ]
        }
      },
      {
        heading: 'zsh/net/tcp — TCP Without netcat',
        code: {
          lang: 'zsh', text:
`zmodload zsh/net/tcp

ztcp example.com 80
local fd=$REPLY

print -u $fd "GET / HTTP/1.0\\r\\nHost: example.com\\r\\n\\r\\n"

local line
while IFS= read -r -u $fd line; do
  echo "$line"
done

ztcp -c $fd   # close connection`
        },
        tip: "Pure Zsh TCP I/O — works in locked-down environments where netcat, curl, and wget are all unavailable."
      },
      {
        heading: 'zsh/datetime — High-Resolution Timing',
        code: {
          lang: 'zsh', text:
`zmodload zsh/datetime

strftime "%Y-%m-%d %H:%M:%S" $EPOCHSECONDS

# Time a command precisely
local t0=$EPOCHREALTIME
nmap -sn 192.168.1.0/24 &>/dev/null
printf "Scan took %.2f seconds\\n" $(( EPOCHREALTIME - t0 ))`
        }
      },
    ]
  },
];

/* ── Quizzes per level ───────────────────────────────── */
const QUIZZES = {
  0: [
    {
      q: "Which Zsh-specific command gives the most detailed report on the origin of a command?",
      opts: ["which ls", "type ls", "whence -v ls", "help ls"],
      ans: 2, exp: "`whence -v` is Zsh-native and reports whether a command is a builtin, alias, function, or external binary."
    },
    {
      q: "What does `tail -f /var/log/auth.log` do?",
      opts: ["Print the last 10 lines once", "Follow the file — print new lines as they appear", "Print the first 10 lines", "Search for auth errors"],
      ans: 1, exp: "`tail -f` continuously streams new lines written to the file — essential for live log monitoring."
    },
    {
      q: "Which command shows all files including hidden ones with details?",
      opts: ["ls -l", "ls -la", "ls -h", "ls -r"],
      ans: 1, exp: "`ls -la` combines `-l` (long format) and `-a` (all files, including dot-files)."
    },
    {
      q: "What does exit code 0 mean in Unix?",
      opts: ["Error", "Success", "Permission denied", "Not found"],
      ans: 1, exp: "Exit code 0 always means success in Unix. Non-zero codes indicate failures."
    },
  ],
  1: [
    {
      q: "Which operator redirects BOTH stdout and stderr to a file?",
      opts: ["2> file", "> file", "&> file", ">> file"],
      ans: 2, exp: "`&>` is Zsh/Bash shorthand for redirecting both stdout (1) and stderr (2) to the same file."
    },
    {
      q: "What does `diff <(ls dir1) <(ls dir2)` use?",
      opts: ["Heredoc", "Process substitution", "Pipe", "Herestring"],
      ans: 1, exp: "`<(cmd)` is process substitution — it makes command output appear as a named file, eliminating temp files."
    },
    {
      q: "What grep flag prints ONLY the matching part of a line?",
      opts: ["-n", "-v", "-c", "-o"],
      ans: 2, exp: "`grep -o` prints only the portion of the line that matched the pattern."
    },
    {
      q: "Which awk invocation sums column 4 of every line?",
      opts: [
        "awk '{sum += $4} END {print sum}'",
        "awk '{print $4}'",
        "awk -F4 '{sum}'",
        "awk 'NR==4 {sum}'"
      ],
      ans: 0, exp: "The END block runs after all input. Accumulating into `sum` during main block then printing in END is the canonical awk sum pattern."
    },
  ],
  2: [
    {
      q: "In Zsh, what index does the FIRST element of an array have?",
      opts: ["0", "1", "-1", "It depends on the shell mode"],
      ans: 1, exp: "Zsh arrays are 1-indexed by default (unlike Bash which is 0-indexed). This catches many Bash converts off guard."
    },
    {
      q: "What does `${path##*/}` return when path='/home/user/file.txt'?",
      opts: ["/home/user", "file.txt", "/home/user/file", "file"],
      ans: 1, exp: "`##*/` removes the LONGEST match of `*/` from the start — equivalent to `basename`. Result: `file.txt`."
    },
    {
      q: "Which Zsh conditional supports regex matching with `=~`?",
      opts: ["[ ]", "test", "[[ ]]", "(( ))"],
      ans: 2, exp: "`[[ ]]` is the Zsh/Bash compound test that supports `=~` for regex, `==` for glob, and `&&`/`||` without escaping."
    },
    {
      q: "What is the correct way to read a file line by line safely (handles spaces)?",
      opts: [
        "for line in $(cat file); do ...",
        "while IFS= read -r line; do ... done < file",
        "cat file | for line in; do ...",
        "read file | while line; do ..."
      ],
      ans: 1, exp: "`while IFS= read -r line` is the safe pattern. `IFS=` prevents trimming, `-r` prevents backslash interpretation."
    },
  ],
  3: [
    {
      q: "What is the Zsh-only loop that runs a block exactly N times?",
      opts: ["loop N { }", "repeat N { }", "times N do", "for i in N; do"],
      ans: 1, exp: "`repeat N { command }` is unique to Zsh. It runs the block exactly N times with no counter variable needed."
    },
    {
      q: "Which glob qualifier selects only regular files (not dirs or symlinks)?",
      opts: ["*(/)", "*(f)", "*(.)", "*(@)"],
      ans: 2, exp: "`*(.)` selects regular files only. `*(/)` = directories, `*(@)` = symlinks."
    },
    {
      q: "What does `setopt PIPE_FAIL` change?",
      opts: [
        "Pipes always succeed regardless of errors",
        "The pipe exits with the status of the last command only",
        "The pipe fails if ANY command in it fails",
        "Pipes run in the background automatically"
      ],
      ans: 2, exp: "By default, a pipeline's exit status is the last command's status. PIPE_FAIL makes the pipeline fail if any segment fails."
    },
    {
      q: "What keyword keeps a variable's value from leaking out of a function?",
      opts: ["private", "local", "readonly", "scoped"],
      ans: 1, exp: "`local` restricts the variable to the current function's scope. Without it, the variable modifies global state."
    },
  ],
  4: [
    {
      q: "What ZLE variable contains the full current command line text?",
      opts: ["$LINE", "$BUFFER", "$CMD", "$PROMPT"],
      ans: 1, exp: "`$BUFFER` is the ZLE variable containing the full text of the current command line. Widgets modify it directly."
    },
    {
      q: "Which setopt option scopes traps to their enclosing function?",
      opts: ["TRAP_SCOPE", "LOCAL_TRAPS", "FUNCTION_TRAPS", "ERR_SCOPE"],
      ans: 1, exp: "`setopt LOCAL_TRAPS` causes traps set inside a function to be restored to their outer values when the function returns."
    },
    {
      q: "What does `zparseopts` do compared to `getopts`?",
      opts: [
        "They are identical",
        "zparseopts only handles short flags",
        "zparseopts handles both short and long options natively",
        "zparseopts is slower but more portable"
      ],
      ans: 2, exp: "`zparseopts` is Zsh-specific and handles `-s`, `--long`, required args, and optional args natively. `getopts` only handles short POSIX flags."
    },
    {
      q: "What does the `(f)` parameter flag do in `${(f)var}`?",
      opts: [
        "Forces float conversion",
        "Splits value on newlines into an array",
        "Makes the variable readonly",
        "Applies file expansion"
      ],
      ans: 1, exp: "`${(f)var}` splits the value of var on newlines, returning an array — one element per line. Essential for safe output-to-array conversion."
    },
  ],
  5: [
    {
      q: "What is the advantage of two-stage port scanning over scanning all ports with -sV directly?",
      opts: [
        "No advantage — two-stage is slower",
        "Stage 1 finds open ports fast; Stage 2 runs expensive -sV only on open ports",
        "Two-stage avoids firewall detection completely",
        "It scans UDP and TCP simultaneously"
      ],
      ans: 1, exp: "Running -sV (version detection) on all 65535 ports is extremely slow. A fast first pass with --min-rate finds open ports, then -sV only on those."
    },
    {
      q: "In the bulk scanner, why wait every N background jobs instead of all at once?",
      opts: [
        "Zsh cannot wait for more than 5 jobs",
        "To prevent flooding the network and exhausting system resources",
        "Background jobs cannot be tracked otherwise",
        "Each job must finish before the next starts"
      ],
      ans: 1, exp: "Batching wait() calls limits the maximum number of concurrent scanners, preventing network flooding and file descriptor exhaustion."
    },
    {
      q: "Which command captures ALL output (stdout + stderr) to a log file while still showing it on screen?",
      opts: [
        "exec > log.txt",
        "exec > >(tee -a log.txt) 2>&1",
        "script log.txt",
        "cmd | tee log.txt"
      ],
      ans: 1, exp: "`exec > >(tee -a log.txt) 2>&1` redirects the shell's own stdout into tee (which writes to screen AND file) and merges stderr into it."
    },
    {
      q: "What does `dig axfr domain.com @ns1.domain.com` attempt?",
      opts: ["A regular DNS A record lookup", "DNS zone transfer — copying all records from a nameserver", "Reverse DNS lookup", "DNSSEC validation"],
      ans: 1, exp: "AXFR is the DNS zone transfer request. If the nameserver allows it, you receive ALL DNS records for the domain — a major information disclosure."
    },
  ],
  6: [
    {
      q: "What does `${0:A:h:h}` resolve to in a Zsh script?",
      opts: [
        "The script filename without extension",
        "The script's directory",
        "Two directory levels above the script's resolved absolute path",
        "The home directory"
      ],
      ans: 2, exp: "`${0:A}` resolves symlinks to absolute path. `:h` is dirname (one level up). `:h:h` goes up two levels — useful for resolving toolkit root."
    },
    {
      q: "Which zsh module provides raw TCP I/O without needing netcat or curl?",
      opts: ["zsh/socket", "zsh/net/tcp", "zsh/io", "zsh/connect"],
      ans: 1, exp: "`zmodload zsh/net/tcp` provides `ztcp` for opening and reading/writing raw TCP connections from pure Zsh."
    },
    {
      q: "In a modular toolkit, what is the main advantage of a dispatcher pattern (bin/pt)?",
      opts: [
        "It makes all modules faster",
        "Single entry point: common flag parsing, env setup, and module dispatch in one place",
        "It encrypts module code automatically",
        "It allows modules to run in parallel automatically"
      ],
      ans: 1, exp: "A dispatcher handles global concerns (auth, env, flag parsing) once, then routes to modules. Modules stay focused on their task."
    },
    {
      q: "What option should you use with `autoload` to prevent function name collisions?",
      opts: ["-U (suppress alias expansion)", "-z (zsh mode)", "-k (ksh mode)", "-p (protect)"],
      ans: 0, exp: "`autoload -Uz`: `-U` suppresses alias expansion inside the function body (preventing accidental alias injection), `-z` loads in Zsh mode."
    },
  ],
};

/* ── State ───────────────────────────────────────────── */
const STATE = {
  completedLevels: new Set(),
  quizScores: {},      // { levelId: { score, total, passed } }
  currentTopic: null,
  sidebarPinned: true,
  sidebarVisible: true,
  certName: '',
};

function saveState() {
  try {
    localStorage.setItem('zsh-academy-state', JSON.stringify({
      completedLevels: [...STATE.completedLevels],
      quizScores: STATE.quizScores,
      certName: STATE.certName,
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('zsh-academy-state');
    if (!raw) return;
    const data = JSON.parse(raw);
    STATE.completedLevels = new Set(data.completedLevels || []);
    STATE.quizScores = data.quizScores || {};
    STATE.certName = data.certName || '';
  } catch(e) {}
}

/* ── Helpers ─────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function highlight(code) {
  const safe = escHtml(code);
  return safe
    .replace(/(#.*)$/gm, '<span class="t-comment">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="t-string">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="t-string">$1</span>')
    .replace(/\b(if|then|else|elif|fi|for|do|done|while|until|case|esac|in|function|return|local|typeset|setopt|source|export|echo|print|read|exit|break|continue|trap|shift|wait|true|false|set|unset|autoload|zmodload|compdef|zstyle|bindkey|repeat|emulate)\b/g,
      '<span class="t-keyword">$1</span>')
    .replace(/(\$\{[^}]+\}|\$[A-Za-z_][A-Za-z0-9_]*)/g, '<span class="t-var">$1</span>')
    .replace(/\b([0-9]+)\b/g, '<span class="t-num">$1</span>');
}

/* ── Progress calculation ────────────────────────────── */
function getTotalProgress() {
  const total = 7; // 7 levels
  const done = STATE.completedLevels.size;
  return Math.round((done / total) * 100);
}

function isLevelQuizPassed(lvl) {
  const s = STATE.quizScores[lvl];
  return s && s.passed;
}

function isLevelComplete(lvl) {
  return STATE.completedLevels.has(lvl);
}

/* ── Sidebar rendering ───────────────────────────────── */
function buildSidebar() {
  const nav = $('#sb-nav');
  nav.innerHTML = '';

  LEVELS.forEach(lvl => {
    const lvlTopics = TOPICS.filter(t => t.level === lvl.id);
    const isDone = isLevelComplete(lvl.id);
    const quizPassed = isLevelQuizPassed(lvl.id);

    const group = el('div', `level-group ${isDone ? 'done' : ''}`);
    group.dataset.level = lvl.id;

    // Header
    const header = el('div', 'level-header');
    header.innerHTML = `
      <span class="level-toggle-icon">▶</span>
      <span class="level-badge" style="background:${lvl.bg};color:${lvl.color}">L${lvl.id}</span>
      <span class="level-title-text" style="color:${lvl.color}">${lvl.label}</span>
      <span class="level-check" style="color:${lvl.color}">✓</span>
    `;
    header.addEventListener('click', () => {
      group.classList.toggle('open');
    });
    group.appendChild(header);

    // Topics list
    const topicList = el('div', 'level-topics');
    lvlTopics.forEach(t => {
      const link = el('div', 'topic-link');
      link.dataset.topicId = t.id;
      link.innerHTML = `
        <span class="topic-icon">${BRANCHES[t.branch].icon}</span>
        <span>${t.title}</span>
      `;
      link.style.borderLeftColor = STATE.currentTopic === t.id ? BRANCHES[t.branch].color : 'transparent';
      link.classList.toggle('active', STATE.currentTopic === t.id);
      link.addEventListener('click', () => showTopic(t.id));
      topicList.appendChild(link);
    });
    group.appendChild(topicList);

    // Level actions
    const actions = el('div', 'level-actions');
    const btnComplete = el('button', `btn-complete${isDone ? ' done' : ''}${!quizPassed && !isDone ? ' locked' : ''}`);

    if (isDone) {
      btnComplete.innerHTML = '✓ Level Complete';
    } else if (!quizPassed) {
      btnComplete.innerHTML = '🔒 Pass quiz to unlock';
      btnComplete.title = 'Complete the mini-quiz for this level first';
    } else {
      btnComplete.innerHTML = '⬛ Mark Level Complete';
      btnComplete.addEventListener('click', () => markLevelComplete(lvl.id));
    }
    actions.appendChild(btnComplete);
    group.appendChild(actions);

    nav.appendChild(group);
  });
}

function updateSidebarProgress() {
  const pct = getTotalProgress();
  const circumference = 220;
  const offset = circumference - (circumference * pct / 100);

  $('#ring-fill').style.strokeDashoffset = offset;

  // Color ring based on progress
  const color = pct === 100 ? '#f0883e' : pct >= 70 ? '#3fb950' : '#58a6ff';
  $('#ring-fill').style.stroke = color;

  $('#ring-pct').textContent = pct + '%';
  $('#ring-bar-fill').style.width = pct + '%';
  $('#ring-label').innerHTML = `${STATE.completedLevels.size} of 7 levels<br>complete`;

  // Update level group done states
  $$('.level-group').forEach(grp => {
    const lvl = parseInt(grp.dataset.level);
    grp.classList.toggle('done', isLevelComplete(lvl));
    const btn = grp.querySelector('.btn-complete');
    if (btn) {
      const done = isLevelComplete(lvl);
      const quizOk = isLevelQuizPassed(lvl);
      btn.className = `btn-complete${done ? ' done' : ''}${!done && !quizOk ? ' locked' : ''}`;
      if (done) {
        btn.innerHTML = '✓ Level Complete';
        btn.onclick = null;
      } else if (!quizOk) {
        btn.innerHTML = '🔒 Pass quiz to unlock';
        btn.onclick = null;
      } else {
        btn.innerHTML = '⬛ Mark Level Complete';
        btn.onclick = () => markLevelComplete(lvl);
      }
    }
  });

  // Active topic links
  $$('.topic-link').forEach(link => {
    const isActive = link.dataset.topicId === STATE.currentTopic;
    link.classList.toggle('active', isActive);
    if (isActive) {
      const topicData = TOPICS.find(t => t.id === link.dataset.topicId);
      link.style.borderLeftColor = topicData ? BRANCHES[topicData.branch].color : 'transparent';
    } else {
      link.style.borderLeftColor = 'transparent';
    }
  });

  // Certificate link in sidebar
  const certLink = $('#cert-sb-link');
  if (certLink) {
    certLink.classList.toggle('unlocked', pct === 100);
    certLink.title = pct < 100 ? `Complete all levels to unlock (${pct}% done)` : 'View your certificate!';
  }
}

/* ── Sidebar pin/hide ────────────────────────────────── */
function initSidebarControls() {
  const sidebar = $('#sidebar');
  const btnHide = $('#btn-hide-sidebar');
  const btnPin  = $('#btn-pin-sidebar');
  const btnOpen = $('#sidebar-open-btn');

  btnHide.addEventListener('click', () => {
    STATE.sidebarVisible = false;
    sidebar.classList.add('hidden');
    document.body.classList.add('sidebar-hidden');
    btnOpen.style.display = 'flex';
  });

  btnPin.addEventListener('click', () => {
    STATE.sidebarPinned = !STATE.sidebarPinned;
    btnPin.textContent = STATE.sidebarPinned ? '📌 Pinned' : '📌 Pin';
    btnPin.classList.toggle('active', STATE.sidebarPinned);
    sidebar.classList.toggle('collapsed', !STATE.sidebarPinned);
  });

  btnOpen.addEventListener('click', () => {
    STATE.sidebarVisible = true;
    sidebar.classList.remove('hidden');
    document.body.classList.remove('sidebar-hidden');
    btnOpen.style.display = 'none';

    // Mobile: toggle mobile-open
    if (window.innerWidth <= 700) {
      sidebar.classList.toggle('mobile-open');
    }
  });
}

/* ── Routing: show home ──────────────────────────────── */
function showHome() {
  STATE.currentTopic = null;
  document.body.className = '';
  updateSidebarProgress();
  renderHome();
  updateBreadcrumb(null);
  window.scrollTo(0, 0);
}

/* ── Routing: show topic ─────────────────────────────── */
function showTopic(id) {
  const topic = TOPICS.find(t => t.id === id);
  if (!topic) return;
  STATE.currentTopic = id;
  document.body.className = 'show-topic';
  updateSidebarProgress();
  renderTopic(topic);
  updateBreadcrumb(topic);
  window.scrollTo(0, 0);

  // Open sidebar group for this level
  $$('.level-group').forEach(g => {
    if (parseInt(g.dataset.level) === topic.level) g.classList.add('open');
  });
}

/* ── Routing: show certificate ───────────────────────── */
function showCertificate() {
  STATE.currentTopic = null;
  document.body.className = 'show-certificate';
  const pct = getTotalProgress();
  if (pct === 100) document.body.classList.add('cert-unlocked');
  updateSidebarProgress();
  renderCertificate();
  updateBreadcrumb({ title: 'Certificate', level: null });
  window.scrollTo(0, 0);
}

/* ── Breadcrumb ──────────────────────────────────────── */
function updateBreadcrumb(topic) {
  const bc = $('#breadcrumb');
  if (!topic) {
    bc.innerHTML = `<span class="crumb-link" onclick="showHome()">zsh-academy</span>`;
    return;
  }
  if (topic.level === null) {
    bc.innerHTML = `
      <span class="crumb-link" onclick="showHome()">zsh-academy</span>
      <span class="sep">/</span>
      <span class="crumb-current">${escHtml(topic.title)}</span>`;
    return;
  }
  const lvl = LEVELS[topic.level];
  bc.innerHTML = `
    <span class="crumb-link" onclick="showHome()">zsh-academy</span>
    <span class="sep">/</span>
    <span class="crumb-current">${escHtml(topic.title)}</span>
    <span class="sep">·</span>
    <span style="font-size:0.75rem;color:${lvl.color}">L${lvl.id}</span>`;
}

/* ── Render home ─────────────────────────────────────── */
function renderHome() {
  const page = $('#page-home');
  const totalTopics = TOPICS.length;
  const totalSections = TOPICS.reduce((a,t) => a + t.sections.length, 0);

  let html = `
    <div class="home-hero">
      <div class="home-prompt">% man zsh-academy</div>
      <h1>Zsh Mastery Academy</h1>
      <p>A comprehensive, structured curriculum from terminal survival to professional pentest automation. Three branches. Seven levels. No shortcuts.</p>
      <div class="stats-row">
        <div class="stat-item"><div class="stat-val">${totalTopics}</div><div class="stat-lbl">Topics</div></div>
        <div class="stat-item"><div class="stat-val">3</div><div class="stat-lbl">Branches</div></div>
        <div class="stat-item"><div class="stat-val">7</div><div class="stat-lbl">Mastery Levels</div></div>
        <div class="stat-item"><div class="stat-val">${totalSections}</div><div class="stat-lbl">Content Sections</div></div>
        <div class="stat-item"><div class="stat-val">${getTotalProgress()}%</div><div class="stat-lbl">Progress</div></div>
      </div>
    </div>

    <div style="margin-bottom:2.5rem">
      <div class="section-label">Curriculum Branches</div>
      <div class="branches-grid">`;

  Object.entries(BRANCHES).forEach(([key, b]) => {
    const cnt = TOPICS.filter(t => t.branch === key).length;
    html += `<div class="branch-card" style="border-color:${b.color}22">
      <div class="branch-icon">${b.icon}</div>
      <div class="branch-name" style="color:${b.color}">${b.label}</div>
      <div class="branch-count">${cnt} topics</div>
    </div>`;
  });

  html += `</div></div><div class="section-label">Mastery Roadmap</div><div class="roadmap">`;

  LEVELS.forEach(lvl => {
    const lvlTopics = TOPICS.filter(t => t.level === lvl.id);
    const isDone = isLevelComplete(lvl.id);
    html += `
      <div class="roadmap-level">
        <div class="rl-header">
          <div class="rl-dot ${isDone ? 'done-dot' : ''}" style="background:${lvl.bg};border-color:${lvl.color};color:${lvl.color}">${isDone ? '✓' : lvl.id}</div>
          <div class="rl-name" style="color:${lvl.color}">${lvl.label}</div>
          <div class="rl-line"></div>
        </div>
        <div class="rl-topics">`;
    lvlTopics.forEach(t => {
      const b = BRANCHES[t.branch];
      html += `<div class="topic-card" onclick="showTopic('${t.id}')" style="border-color:${isDone ? b.color+'33' : ''}">
        <div class="tc-head"><span class="tc-icon">${b.icon}</span><span class="tc-title">${escHtml(t.title)}</span></div>
        <div class="tc-desc">${escHtml(t.description)}</div>
        <div class="tc-tags">${t.tags.slice(0,3).map(tg=>`<span class="tc-tag">#${tg}</span>`).join('')}</div>
      </div>`;
    });
    html += `</div></div>`;
  });

  html += `</div>`;
  page.innerHTML = html;
}

/* ── Render topic ────────────────────────────────────── */
function renderTopic(topic) {
  const page = $('#page-topic');
  const lvl = LEVELS[topic.level];
  const br = BRANCHES[topic.branch];
  const quizScore = STATE.quizScores[topic.level];

  let html = `
    <div class="topic-header">
      <div class="topic-badges">
        <span class="badge" style="background:${lvl.bg};color:${lvl.color}">Level ${lvl.id} · ${lvl.label}</span>
        <span class="badge" style="background:transparent;color:${br.color};border-color:${br.color}44">${br.icon} ${br.label}</span>
      </div>
      <h1>${escHtml(topic.title)}</h1>
      <div class="desc">${escHtml(topic.description)}</div>
      <div class="topic-tags">${topic.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div>
    </div>
    <div class="topic-intro">${escHtml(topic.intro)}</div>`;

  topic.sections.forEach(sec => {
    html += renderSection(sec);
  });

  // Quiz section
  const quizData = QUIZZES[topic.level];
  const alreadyPassed = isLevelQuizPassed(topic.level);
  html += `
    <div class="quiz-trigger-wrap">
      <div class="quiz-trigger-label">— Level ${lvl.id} Mini-Quiz —</div>
      <button class="btn-start-quiz ${alreadyPassed ? 'done' : ''}" onclick="openQuiz(${topic.level})" id="btn-open-quiz-${topic.level}">
        ${alreadyPassed ? '✓ Quiz Passed' : '🎯 Take the Quiz — ' + quizData.length + ' questions'}
      </button>
      ${quizScore ? `<div class="quiz-score-badge visible">Score: ${quizScore.score}/${quizScore.total} — ${quizScore.passed ? '✓ Passed' : '✗ Try again'}</div>` : ''}
    </div>`;

  page.innerHTML = html;
  page.querySelectorAll('.copy-btn').forEach(attachCopyHandler);
}

function renderSection(sec) {
  let html = `<div class="content-section">
    <div class="section-h2"><span class="hash">#</span> ${escHtml(sec.heading)}</div>`;

  if (sec.body) html += `<div class="section-body">${escHtml(sec.body).replace(/`([^`]+)`/g,'<code>$1</code>')}</div>`;
  if (sec.table) html += renderTable(sec.table);
  if (sec.code) html += renderCode(sec.code);
  if (sec.tip) html += `<div class="tip-box"><strong>💡 Tip:</strong>${escHtml(sec.tip).replace(/`([^`]+)`/g,'<code>$1</code>')}</div>`;
  if (sec.subsections) sec.subsections.forEach(s => { html += renderSection(s); });

  html += `</div>`;
  return html;
}

function renderTable({ headers, rows }) {
  let html = `<div class="data-table-wrap"><table class="data-table">
    <thead><tr>${headers.map(h=>`<th>${escHtml(h)}</th>`).join('')}</tr></thead><tbody>`;
  rows.forEach(row => {
    html += `<tr>${row.map((cell, i) => {
      const safe = escHtml(cell).replace(/`([^`]+)`/g,'<code>$1</code>');
      return `<td>${i === 0 ? `<span class="td-cmd">${safe}</span>` : safe}</td>`;
    }).join('')}</tr>`;
  });
  html += `</tbody></table></div>`;
  return html;
}

function renderCode({ lang, text }) {
  const highlighted = highlight(text);
  return `
    <div class="code-block">
      <span class="code-lang">${escHtml(lang)}</span>
      <button class="copy-btn" data-code="${escHtml(text)}">Copy</button>
      <pre><code>${highlighted}</code></pre>
    </div>`;
}

function attachCopyHandler(btn) {
  btn.addEventListener('click', () => {
    const code = btn.dataset.code || btn.closest('.code-block')?.querySelector('code')?.textContent || '';
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '✓ Copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1600);
    }).catch(() => {});
  });
}

/* ── Quiz logic ──────────────────────────────────────── */
let quizState = {};

function openQuiz(levelId) {
  const questions = QUIZZES[levelId];
  if (!questions) return;
  quizState = { levelId, questions, current: 0, score: 0, answered: false };
  renderQuizQuestion();
  $('#quiz-overlay').classList.add('open');
}

function renderQuizQuestion() {
  const { questions, current } = quizState;
  const q = questions[current];
  const total = questions.length;
  const modal = $('#quiz-modal');

  const pct = (current / total) * 100;
  modal.innerHTML = `
    <div class="quiz-modal-header">
      <div class="quiz-modal-title">🎯 Level Quiz — ${LEVELS[quizState.levelId].label}</div>
      <button class="quiz-close" onclick="closeQuiz()">✕</button>
    </div>
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-q-num">Question ${current + 1} of ${total}</div>
    <div class="quiz-question">${q.q.replace(/`([^`]+)`/g, '<code>$1</code>')}</div>
    <div class="quiz-options" id="quiz-opts">
      ${q.opts.map((opt, i) => `
        <button class="quiz-option" onclick="selectOption(${i})" data-idx="${i}">
          <span class="opt-letter">${'ABCD'[i]}</span>
          <span>${escHtml(opt)}</span>
        </button>`).join('')}
    </div>
    <div class="quiz-feedback" id="quiz-feedback"></div>
    <div class="quiz-actions">
      <button class="btn-quiz-next" id="btn-quiz-next" disabled onclick="nextQuestion()">
        ${current < total - 1 ? 'Next →' : 'See Results'}
      </button>
    </div>`;
  quizState.answered = false;
}

function selectOption(idx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const { questions, current } = quizState;
  const q = questions[current];
  const correct = q.ans === idx;

  if (correct) quizState.score++;

  $$('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    if (i === idx && !correct) btn.classList.add('wrong');
    if (i === idx) btn.classList.add('selected');
  });

  const fb = $('#quiz-feedback');
  fb.className = `quiz-feedback ${correct ? 'correct' : 'wrong'}`;
  fb.innerHTML = `<strong>${correct ? '✓ Correct!' : '✗ Incorrect.'}</strong> ${escHtml(q.exp)}`;

  $('#btn-quiz-next').disabled = false;
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= quizState.questions.length) {
    showQuizResults();
  } else {
    renderQuizQuestion();
  }
}

function showQuizResults() {
  const { score, questions, levelId } = quizState;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 75;

  STATE.quizScores[levelId] = { score, total, passed };
  saveState();
  updateSidebarProgress();

  const modal = $('#quiz-modal');
  const icon = passed ? '🏆' : pct >= 50 ? '📊' : '❌';
  const color = passed ? '#3fb950' : pct >= 50 ? '#d2991d' : '#ff7b72';
  const msg = passed
    ? 'Excellent work! You have demonstrated solid understanding of this level. You can now mark it as complete.'
    : pct >= 50
    ? 'Good attempt! Review the topics and try again to unlock level completion.'
    : 'Keep studying! Re-read the sections and attempt the quiz again when ready.';

  modal.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon">${icon}</div>
      <div class="quiz-result-title">${passed ? 'Quiz Passed!' : 'Quiz Complete'}</div>
      <div class="quiz-result-score" style="color:${color}">${score}/${total}</div>
      <div style="color:${color};font-size:0.9rem;margin-bottom:0.5rem;font-family:var(--mono)">${pct}% — ${passed ? 'PASS ✓' : 'FAIL ✗'} (75% to pass)</div>
      <div class="quiz-result-msg">${msg}</div>
      <div>
        ${!passed ? `<button class="btn-quiz-action btn-secondary" onclick="openQuiz(${levelId})">↩ Retry Quiz</button>` : ''}
        ${passed ? `<button class="btn-quiz-action btn-success" onclick="closeQuiz(); markLevelComplete(${levelId})">✓ Mark Level Complete</button>` : ''}
        <button class="btn-quiz-action btn-secondary" onclick="closeQuiz()">Close</button>
      </div>
    </div>`;
}

function closeQuiz() {
  $('#quiz-overlay').classList.remove('open');
  // Refresh topic view to update quiz button state
  if (STATE.currentTopic) {
    const topic = TOPICS.find(t => t.id === STATE.currentTopic);
    if (topic) renderTopic(topic);
  }
}

/* ── Level completion ────────────────────────────────── */
function markLevelComplete(lvl) {
  if (!isLevelQuizPassed(lvl)) return;
  STATE.completedLevels.add(lvl);
  saveState();
  updateSidebarProgress();

  // Flash feedback
  const btn = $(`.level-group[data-level="${lvl}"] .btn-complete`);
  if (btn) {
    btn.textContent = '✓ Level Complete';
    btn.className = 'btn-complete done';
    btn.onclick = null;
  }

  // Check if all done → show certificate prompt
  if (STATE.completedLevels.size === 7) {
    setTimeout(() => {
      if (confirm('🎉 Congratulations! You\'ve completed all 7 levels! View your certificate?')) {
        showCertificate();
      }
    }, 400);
  }
}

/* ── Certificate ─────────────────────────────────────── */
function renderCertificate() {
  const page = $('#page-certificate');
  const pct = getTotalProgress();
  const unlocked = pct === 100;
  const name = STATE.certName || 'Your Name';
  const today = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });

  let html = `
    <div style="max-width:860px;margin:0 auto;padding:2rem 0">
      <div class="section-label" style="margin-bottom:1.5rem">Course Certificate</div>`;

  if (!unlocked) {
    html += `
      <div class="cert-locked-notice">
        <div class="cert-locked-icon">🔒</div>
        <div class="cert-locked-title">Certificate Locked</div>
        <div class="cert-locked-msg">Complete all 7 mastery levels and pass their quizzes to unlock your certificate of completion.</div>
        <div class="cert-locked-progress">${pct}% complete — ${7 - STATE.completedLevels.size} level${7 - STATE.completedLevels.size !== 1 ? 's' : ''} remaining</div>
      </div>`;
  } else {
    // Name entry
    html += `
      <div style="margin-bottom:1.5rem;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <input id="cert-name-input" type="text" placeholder="Enter your name for the certificate"
          value="${escHtml(STATE.certName)}"
          style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.5rem 1rem;color:#e6edf3;font-size:0.9rem;flex:1;min-width:200px;font-family:inherit;outline:none"
          oninput="updateCertName(this.value)" />
        <button onclick="window.print()" class="btn-print">🖨 Print / Save PDF</button>
      </div>`;
  }

  html += `
      <div class="${unlocked ? 'certificate-wrap' : 'certificate-wrap'}" ${!unlocked ? 'style="display:none"' : ''}>
        <div class="certificate">
          <div class="cert-watermark">ZSH</div>
          <div class="cert-corner tl"></div>
          <div class="cert-corner tr"></div>
          <div class="cert-corner bl"></div>
          <div class="cert-corner br"></div>

          <div class="cert-badge">🛡️</div>
          <div class="cert-academy">Zsh Mastery Academy</div>
          <div class="cert-title">Certificate of Completion</div>
          <div class="cert-divider"></div>
          <div class="cert-certifies">This certifies that</div>
          <div class="cert-name" id="cert-display-name">${escHtml(name)}</div>
          <div class="cert-desc">has successfully completed the Zsh Mastery Academy curriculum, demonstrating proficiency in Zsh shell scripting from terminal fundamentals through professional pentest automation tooling.</div>

          <div class="cert-levels">
            ${LEVELS.map(l => `<span class="cert-level-tag" style="color:${l.color};border-color:${l.color};background:${l.bg}">L${l.id} ${l.label}</span>`).join('')}
          </div>

          <div class="cert-footer">
            <div>
              <div class="cert-sig">// Zsh Academy</div>
              <div style="font-size:0.68rem;color:#484f58;margin-top:2px">Three branches · Seven levels</div>
            </div>
            <div class="cert-date">${today}</div>
          </div>
        </div>
      </div>
    </div>`;

  page.innerHTML = html;
}

function updateCertName(val) {
  STATE.certName = val;
  saveState();
  const disp = $('#cert-display-name');
  if (disp) disp.textContent = val || 'Your Name';
}

/* ── Init ────────────────────────────────────────────── */
function init() {
  loadState();
  buildSidebar();
  updateSidebarProgress();
  initSidebarControls();
  renderHome();

  // Escape → home
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && STATE.currentTopic) showHome();
  });

  // Close mobile sidebar on outside click
  document.addEventListener('click', e => {
    if (window.innerWidth <= 700) {
      const sidebar = $('#sidebar');
      if (sidebar.classList.contains('mobile-open') &&
          !sidebar.contains(e.target) &&
          !$('#sidebar-open-btn').contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
